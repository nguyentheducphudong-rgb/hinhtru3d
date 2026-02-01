import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Cylinder3D from './Cylinder3D';

interface SceneProps {
    radius: number;
    height: number;
    unfoldProgress: number;
    opacity: number;
    activeComponent: 'none' | 'vertex' | 'edge' | 'face' | 'label';
    showLabels: boolean;
    exploreMode: boolean;
    onResetCamera: () => void;
}

export default function Scene({
    radius,
    height,
    unfoldProgress,
    opacity,
    activeComponent,
    showLabels,
    exploreMode,
}: SceneProps) {
    return (
        <Canvas
            camera={{ position: [5, 4, 5], fov: 50 }}
            style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a237e 100%)' }}
        >
            {/* Ánh sáng */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#4dd0e1" />

            {/* Hình trụ 3D */}
            <Cylinder3D
                radius={radius}
                height={height}
                unfoldProgress={unfoldProgress}
                opacity={opacity}
                activeComponent={activeComponent}
                showLabels={showLabels}
                exploreMode={exploreMode}
            />

            {/* Grid helper */}
            <gridHelper args={[20, 20, '#1a237e', '#0d47a1']} position={[0, -8, 0]} />

            {/* Controls */}
            <OrbitControls
                makeDefault
                enableDamping
                dampingFactor={0.05}
                minDistance={3}
                maxDistance={20}
            />

            {/* Environment for reflections */}
            <Environment preset="city" />
        </Canvas>
    );
}
