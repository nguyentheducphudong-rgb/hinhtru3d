import { memo } from 'react';
import './ControlPanel.css';
import '../components/Slider.css'; // Import slider styles

interface ControlPanelProps {
    radius: number;
    height: number;
    unfoldProgress: number;
    opacity: number;
    activeComponent: string;
    exploreMode: boolean;
    showVolume: boolean;
    isAutoPlaying: boolean;
    playSpeed: number;
    onRadiusChange: (val: number) => void;
    onHeightChange: (val: number) => void;
    onUnfoldProgressChange: (val: number) => void;
    onOpacityChange: (val: number) => void;
    onActiveComponentChange: (val: any) => void;
    onExploreModeChange: (val: boolean) => void;
    onShowVolumeChange: (val: boolean) => void;
    onAutoPlayChange: (val: boolean) => void;
    onPlaySpeedChange: (val: number) => void;
    onResetCamera: () => void;
}

function ControlPanel({
    radius,
    height,
    unfoldProgress,
    opacity,
    activeComponent,
    exploreMode,
    showVolume,
    isAutoPlaying,
    playSpeed,
    onRadiusChange,
    onHeightChange,
    onUnfoldProgressChange,
    onOpacityChange,
    onActiveComponentChange,
    onExploreModeChange,
    onShowVolumeChange,
    onAutoPlayChange,
    onPlaySpeedChange,
    onResetCamera
}: ControlPanelProps) {

    return (
        <div className="control-panel">
            <div className="panel-header">
                <h1 className="panel-title">
                    <span className="title-icon">💠</span>
                    HÌNH TRỤ
                </h1>
                <p className="panel-subtitle">Mô phỏng 3D tương tác</p>
            </div>

            <div className="panel-section">
                <h3 className="section-title">Thành phần</h3>
                <div className="component-buttons">
                    <button
                        className={`mode-btn ${activeComponent === 'vertex' ? 'active' : ''}`}
                        onClick={() => onActiveComponentChange(activeComponent === 'vertex' ? 'none' : 'vertex')}
                    >
                        <span className="mode-icon">🔴</span> ĐỈNH
                    </button>
                    <button
                        className={`mode-btn ${activeComponent === 'edge' ? 'active' : ''}`}
                        onClick={() => onActiveComponentChange(activeComponent === 'edge' ? 'none' : 'edge')}
                    >
                        <span className="mode-icon">🔵</span> CẠNH
                    </button>
                    <button
                        className={`mode-btn ${activeComponent === 'face' ? 'active' : ''}`}
                        onClick={() => onActiveComponentChange(activeComponent === 'face' ? 'none' : 'face')}
                    >
                        <span className="mode-icon">🔷</span> MẶT
                    </button>
                    <button
                        className={`mode-btn ${activeComponent === 'label' ? 'active' : ''}`}
                        onClick={() => onActiveComponentChange(activeComponent === 'label' ? 'none' : 'label')}
                    >
                        <span className="mode-icon">🟢</span> NHÃN
                    </button>
                </div>
            </div>

            <div className="panel-section">
                <h3 className="section-title">Chế độ</h3>
                <div className="mode-buttons">
                    <button
                        className={`mode-btn explore ${exploreMode ? 'active' : ''}`}
                        onClick={() => onExploreModeChange(!exploreMode)}
                    >
                        <span className="mode-icon">🔍</span> KHÁM PHÁ
                    </button>
                    <button
                        className={`mode-btn volume ${showVolume ? 'active' : ''}`}
                        onClick={() => onShowVolumeChange(!showVolume)}
                    >
                        <span className="mode-icon">📦</span> THỂ TÍCH
                    </button>
                </div>
            </div>

            <div className="panel-section">
                <h3 className="section-title">Điều chỉnh</h3>

                {/* Mở khối / Trải hình */}
                <div className="slider-container">
                    <div className="slider-header">
                        <label className="slider-label">🌀 Mở khối / Trải hình</label>
                        <div className="slider-input-wrapper">
                            <span className="slider-input">{unfoldProgress}%</span>
                        </div>
                    </div>
                    <div className="slider-range-wrapper">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={unfoldProgress}
                            onChange={(e) => onUnfoldProgressChange(Number(e.target.value))}
                            className="slider-range"
                        />
                    </div>
                    <div className="slider-bounds">
                        <span>Đóng</span>
                        <span>Mở</span>
                    </div>

                    {/* Auto Run Controls */}
                    <div className="auto-run-controls" style={{
                        marginTop: '0.75rem',
                        padding: '0.5rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <button
                                className={`mode-btn ${isAutoPlaying ? 'active' : ''}`}
                                onClick={() => onAutoPlayChange(!isAutoPlaying)}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    background: isAutoPlaying ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                    borderColor: isAutoPlaying ? '#4caf50' : 'rgba(255, 255, 255, 0.2)',
                                    color: isAutoPlaying ? '#4caf50' : '#b0bec5'
                                }}
                            >
                                {isAutoPlaying ? '⏸ Dừng' : '▶ Tự động'}
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.65rem', color: '#90a4ae', whiteSpace: 'nowrap' }}>Tốc độ: {playSpeed.toFixed(1)}x</span>
                            <input
                                type="range"
                                min="0.1"
                                max="3"
                                step="0.1"
                                value={playSpeed}
                                onChange={(e) => onPlaySpeedChange(Number(e.target.value))}
                                className="slider-range"
                                style={{ height: '4px', flex: 1 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Bán kính */}
                <div className="slider-container">
                    <div className="slider-header">
                        <label className="slider-label">📏 Bán kính (r)</label>
                        <div className="slider-input-wrapper">
                            <span className="slider-input">{radius} cm</span>
                        </div>
                    </div>
                    <div className="slider-range-wrapper">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="0.1"
                            value={radius}
                            onChange={(e) => onRadiusChange(Number(e.target.value))}
                            className="slider-range"
                        />
                    </div>
                    <div className="slider-bounds">
                        <span>1cm</span>
                        <span>5cm</span>
                    </div>
                </div>

                {/* Chiều cao */}
                <div className="slider-container">
                    <div className="slider-header">
                        <label className="slider-label">📐 Chiều cao (h)</label>
                        <div className="slider-input-wrapper">
                            <span className="slider-input">{height} cm</span>
                        </div>
                    </div>
                    <div className="slider-range-wrapper">
                        <input
                            type="range"
                            min="2"
                            max="8"
                            step="0.1"
                            value={height}
                            onChange={(e) => onHeightChange(Number(e.target.value))}
                            className="slider-range"
                        />
                    </div>
                    <div className="slider-bounds">
                        <span>2cm</span>
                        <span>8cm</span>
                    </div>
                </div>

                {/* Độ trong suốt */}
                <div className="slider-container">
                    <div className="slider-header">
                        <label className="slider-label">👁️ Độ trong suốt</label>
                        <div className="slider-input-wrapper">
                            <span className="slider-input">{opacity / 100}</span>
                        </div>
                    </div>
                    <div className="slider-range-wrapper">
                        <input
                            type="range"
                            min="20"
                            max="100"
                            value={opacity}
                            onChange={(e) => onOpacityChange(Number(e.target.value))}
                            className="slider-range"
                        />
                    </div>
                </div>

                <button className="reset-camera-btn" onClick={onResetCamera}>
                    <span>📷</span> Đặt lại góc nhìn
                </button>
            </div>
        </div>
    );
}

export default memo(ControlPanel);
