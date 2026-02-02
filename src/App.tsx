import { useState, useCallback, useEffect, useRef } from 'react';
import Scene from './components/Scene';
import ControlPanel from './components/ControlPanel';
import BottomStatus from './components/BottomStatus';
import './App.css';

type ComponentType = 'none' | 'vertex' | 'edge' | 'face' | 'label';

function App() {
  // State quản lý Control Panel trên mobile
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // State cho các tham số hình trụ
  const [radius, setRadius] = useState(2); // cm
  const [height, setHeight] = useState(4); // cm
  const [unfoldProgress, setUnfoldProgress] = useState(0); // 0-100%
  const [opacity, setOpacity] = useState(85); // 20-100%

  // State cho chế độ hiển thị
  const [activeComponent, setActiveComponent] = useState<ComponentType>('none');
  const [exploreMode, setExploreMode] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  // State cho tự động chạy
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1.0); // 0.1-3
  const animationDirection = useRef(1); // 1: OPEN, -1: CLOSE

  // Auto-play Animation Loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (isAutoPlaying) {
        setUnfoldProgress((prev) => {
          let next = prev + (0.5 * playSpeed * animationDirection.current);

          if (next >= 100) {
            next = 100;
            animationDirection.current = -1; // Reverse
          } else if (next <= 0) {
            next = 0;
            animationDirection.current = 1; // Forward
          }
          return next;
        });
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (isAutoPlaying) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoPlaying, playSpeed]);

  // Reset camera handler
  const handleResetCamera = useCallback(() => {
    console.log('Reset camera');
  }, []);

  return (
    <>
      <div className="app">
        {/* Mobile Toggle Button */}
        <button
          className={`mobile-toggle-btn ${isPanelOpen ? 'active' : ''}`}
          onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
          {isPanelOpen ? '✕' : '⚙️'}
        </button>

        {/* Control Panel - Khu vực điều khiển (Bên trái) */}
        <div className={`panel-container ${isPanelOpen ? 'open' : ''}`}>
          <ControlPanel
            radius={radius}
            height={height}
            unfoldProgress={unfoldProgress}
            opacity={opacity}
            activeComponent={activeComponent}
            exploreMode={exploreMode}
            showVolume={showVolume}
            isAutoPlaying={isAutoPlaying}
            playSpeed={playSpeed}
            onRadiusChange={setRadius}
            onHeightChange={setHeight}
            onUnfoldProgressChange={setUnfoldProgress}
            onOpacityChange={setOpacity}
            onActiveComponentChange={setActiveComponent}
            onExploreModeChange={setExploreMode}
            onShowVolumeChange={setShowVolume}
            onAutoPlayChange={setIsAutoPlaying}
            onPlaySpeedChange={setPlaySpeed}
            onResetCamera={handleResetCamera}
          />
        </div>

        {/* Canvas 3D - Khu vực hiển thị hình trụ */}
        <div className="canvas-container">
          <Scene
            radius={radius}
            height={height}
            unfoldProgress={unfoldProgress}
            opacity={opacity}
            activeComponent={activeComponent}
            showLabels={activeComponent === 'label' || exploreMode}
            exploreMode={exploreMode}
            onResetCamera={handleResetCamera}
          />

          {/* Overlay hướng dẫn (Góc trên phải) */}
          <div className="canvas-overlay" style={{ bottom: 'auto', top: '1.5rem', right: '1.5rem', left: 'auto', transform: 'none' }}>
            <div className="instruction-badge">
              🖱️ Kéo để xoay • Cuộn để zoom
            </div>
          </div>

          {/* Hiển thị % unfold khi đang khai triển */}
          {unfoldProgress > 0 && (
            <div className="unfold-indicator">
              <span className="unfold-label">Khai triển</span>
              <span className="unfold-value">{unfoldProgress}%</span>
            </div>
          )}
        </div>

        {/* Bottom Status Bar - Thanh thông số bên dưới */}
        <div className="bottom-status-container">
          <BottomStatus radius={radius} height={height} />
        </div>
      </div>
    </>
  );
}

export default App;
