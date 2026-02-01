import { useMemo } from 'react';
import * as THREE from 'three';
import { Text, Line } from '@react-three/drei';

interface Cylinder3DProps {
  radius: number;
  height: number;
  unfoldProgress: number; // 0-100
  opacity: number;
  activeComponent: 'none' | 'vertex' | 'edge' | 'face' | 'label';
  showLabels: boolean;
  exploreMode: boolean;
}

/**
 * Component Cylinder3D với animation khai triển 2 giai đoạn
 * 
 * Giai đoạn 1 (0-50%): Mở 2 nắp đáy ra
 *   - Đáy TÁCH ra theo trục Y (lên trên/xuống dưới)
 *   - Đáy XOAY để mặt tròn QUAY VỀ PHÍA CAMERA (phía trước, Z dương)
 * 
 * Giai đoạn 2 (50-100%): Mở thân
 *   - Cắt ở phía TRƯỚC (Z dương)
 *   - Thân tách đôi và mở ra 2 bên (trái/phải theo X)
 * 
 * Kết quả cuối: HCN trải phẳng, 2 đáy tròn gắn ở giữa cạnh trên/dưới
 */
export default function Cylinder3D({
  radius,
  height,
  unfoldProgress,
  opacity,
  activeComponent,
  showLabels,
  exploreMode,
}: Cylinder3DProps) {
  // === MÀU SẮC ===
  const bodyColor = new THREE.Color('#ffd54f'); // Vàng cho thân
  const capColor = new THREE.Color('#ef5350');   // Đỏ cho đáy
  const highlightBodyColor = new THREE.Color('#66bb6a');
  const highlightCapColor = new THREE.Color('#ff8a80');
  const edgeHighlightColor = new THREE.Color('#42a5f5');

  // Progress tổng từ 0-1
  const totalProgress = unfoldProgress / 100;

  // Chia animation thành 2 giai đoạn
  const capProgress = Math.min(totalProgress * 2, 1); // 0-50% -> 0-1
  const bodyProgress = Math.max((totalProgress - 0.5) * 2, 0); // 50-100% -> 0-1

  // Chu vi = 2πr
  const circumference = 2 * Math.PI * radius;

  /**
   * Tạo geometry cho mặt xung quanh (thân)
   * Sử dụng ít segment hơn và unfold theo 1 chiều để tránh sọc
   */
  const lateralGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];

    // Sử dụng đủ segments để hiển thị hình trụ mượt
    // MeshBasicMaterial sẽ ngăn shading gây sọc
    const segmentsW = 64; // Đủ segments cho hình trụ mượt
    const segmentsH = 1;

    for (let j = 0; j <= segmentsH; j++) {
      const v = j / segmentsH;
      const y = height / 2 - v * height;

      for (let i = 0; i <= segmentsW; i++) {
        const t = i / segmentsW;

        // Vị trí FLAT (unfold 100%)
        const flatX = (t - 0.5) * circumference;
        const flatZ = 0;

        // Vị trí CYLINDER (unfold 0%)
        const theta = (t - 0.5) * 2 * Math.PI;
        const cylinderX = Math.sin(theta) * radius;
        const cylinderZ = Math.cos(theta) * radius;

        // Interpolate
        const x = THREE.MathUtils.lerp(cylinderX, flatX, bodyProgress);
        const z = THREE.MathUtils.lerp(cylinderZ, flatZ, bodyProgress);

        vertices.push(x, y, z);
        normals.push(0, 0, 1);
        uvs.push(t, 1 - v);
      }
    }

    for (let j = 0; j < segmentsH; j++) {
      for (let i = 0; i < segmentsW; i++) {
        const a = j * (segmentsW + 1) + i;
        const b = a + 1;
        const c = (j + 1) * (segmentsW + 1) + i;
        const d = c + 1;

        indices.push(a, c, b);
        indices.push(b, c, d);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    return geometry;
  }, [radius, height, bodyProgress, circumference]);

  // Đáy di chuyển ra ngoài theo Y
  const capOffsetY = capProgress * radius;

  const topCapY = height / 2 + capOffsetY;
  const bottomCapY = -height / 2 - capOffsetY;

  // Góc xoay đáy
  const topCapRotationX = THREE.MathUtils.lerp(-Math.PI / 2, 0, capProgress);
  const bottomCapRotationX = THREE.MathUtils.lerp(Math.PI / 2, 0, capProgress);

  // Xác định màu
  const getCapColorFinal = () => {
    if (activeComponent === 'vertex') return highlightCapColor;
    return capColor;
  };

  const getBodyColorFinal = () => {
    if (activeComponent === 'face') return highlightBodyColor;
    return bodyColor;
  };

  return (
    <group>
      {/* Mặt xung quanh (Thân) - MÀU VÀNG - dùng MeshBasicMaterial để tránh sọc */}
      <mesh geometry={lateralGeometry}>
        <meshBasicMaterial
          color={getBodyColorFinal()}
          transparent
          opacity={opacity / 100}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe chỉ hiện khi highlight CẠNH */}
      {activeComponent === 'edge' && (
        <mesh geometry={lateralGeometry}>
          <meshBasicMaterial
            color={edgeHighlightColor}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Đáy trên (Top Cap) - MÀU ĐỎ */}
      <group position={[0, topCapY, 0]} rotation={[topCapRotationX, 0, 0]}>
        <mesh>
          <circleGeometry args={[radius, 64]} />
          <meshStandardMaterial
            color={getCapColorFinal()}
            transparent
            opacity={opacity / 100}
            side={THREE.DoubleSide}
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
        {activeComponent === 'edge' && (
          <mesh>
            <ringGeometry args={[radius - 0.03, radius, 64]} />
            <meshBasicMaterial
              color={edgeHighlightColor}
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>

      {/* Đáy dưới (Bottom Cap) - MÀU ĐỎ */}
      <group position={[0, bottomCapY, 0]} rotation={[bottomCapRotationX, 0, 0]}>
        <mesh>
          <circleGeometry args={[radius, 64]} />
          <meshStandardMaterial
            color={getCapColorFinal()}
            transparent
            opacity={opacity / 100}
            side={THREE.DoubleSide}
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
        {activeComponent === 'edge' && (
          <mesh>
            <ringGeometry args={[radius - 0.03, radius, 64]} />
            <meshBasicMaterial
              color={edgeHighlightColor}
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>

      {/* Labels */}
      {(showLabels || activeComponent === 'label') && (
        <>
          <Text
            position={[radius * 0.6, topCapY + 0.4, 0.1]}
            fontSize={0.35}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000000"
          >
            r = {radius.toFixed(1)} cm
          </Text>

          <Text
            position={[circumference / 2 + 0.6, 0, 0]}
            fontSize={0.35}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000000"
          >
            h = {height.toFixed(1)} cm
          </Text>

          {totalProgress > 0.6 && (
            <Text
              position={[0, bottomCapY - radius - 0.6, 0]}
              fontSize={0.3}
              color="#4fc3f7"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              Chiều dài = 2πr = {circumference.toFixed(2)} cm
            </Text>
          )}
        </>
      )}

      {/* Đường kẻ minh họa */}
      {exploreMode && (
        <>
          <Line
            points={[[0, topCapY, 0.05], [radius, topCapY, 0.05]]}
            color="#ffffff"
            lineWidth={2}
          />
          <Line
            points={[
              [circumference / 2 + 0.4, height / 2, 0],
              [circumference / 2 + 0.4, -height / 2, 0]
            ]}
            color="#ffffff"
            lineWidth={2}
          />
        </>
      )}
    </group>
  );
}
