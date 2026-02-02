import './BottomStatus.css';

interface BottomStatusProps {
    radius: number;
    height: number;
}

export default function BottomStatus({ radius, height }: BottomStatusProps) {
    const PI = Math.PI;

    // Tính toán
    const lateralArea = 2 * PI * radius * height; // Sxq
    const totalArea = 2 * PI * radius * (radius + height); // Stp
    const volume = PI * radius * radius * height; // V

    return (
        <div className="bottom-status-track">
            {/* Structural Stats */}
            <div className="status-group structural">
                <div className="stat-item">
                    <span className="stat-label">Đỉnh:</span>
                    <span className="stat-value">0</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Cạnh:</span>
                    <span className="stat-value">2</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Mặt:</span>
                    <span className="stat-value">3</span>
                </div>
            </div>

            {/* Calculations */}
            <div className="status-group calculations">
                <div className="calc-item">
                    <span className="calc-label">Chu vi:</span>
                    <span className="calc-value">{(2 * PI * radius).toFixed(2)}</span>
                </div>
                <div className="calc-item">
                    <span className="calc-label">S.xq:</span>
                    <span className="calc-value">{lateralArea.toFixed(2)}</span>
                </div>
                <div className="calc-item">
                    <span className="calc-label">S.tp:</span>
                    <span className="calc-value">{totalArea.toFixed(2)}</span>
                </div>
                <div className="calc-item">
                    <span className="calc-label">Thể tích:</span>
                    <span className="calc-value">{volume.toFixed(2)}</span>
                </div>
            </div>

            {/* Credit & Controls */}
            <div className="status-right" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: 'auto' }}>
                <div className="status-credit">
                    <span>Phát triển bởi: @ thầy Thế Đức - Giáo viên yêu công nghệ</span>
                </div>

                <button
                    className="fullscreen-btn"
                    onClick={() => {
                        const elem = document.documentElement as any;

                        try {
                            if (!document.fullscreenElement) {
                                // Try standard API first
                                if (elem.requestFullscreen) {
                                    elem.requestFullscreen();
                                }
                                // iOS Safari fallback
                                else if (elem.webkitRequestFullscreen) {
                                    elem.webkitRequestFullscreen();
                                }
                                // Older webkit
                                else if (elem.webkitEnterFullscreen) {
                                    elem.webkitEnterFullscreen();
                                }
                                // Alert if not supported
                                else {
                                    alert('Trình duyệt này không hỗ trợ toàn màn hình. Thử thêm trang vào màn hình chính (Add to Home Screen) trên iOS.');
                                }
                            } else {
                                if (document.exitFullscreen) {
                                    document.exitFullscreen();
                                } else if ((document as any).webkitExitFullscreen) {
                                    (document as any).webkitExitFullscreen();
                                }
                            }
                        } catch (err) {
                            console.error('Fullscreen error:', err);
                            alert('Không thể bật toàn màn hình. Trình duyệt này có thể không hỗ trợ.');
                        }
                    }}
                    title="Toàn màn hình"
                >
                    ⛶
                </button>
            </div>
        </div>
    );
}
