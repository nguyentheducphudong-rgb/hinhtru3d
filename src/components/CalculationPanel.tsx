import './CalculationPanel.css';

interface CalculationPanelProps {
    radius: number;
    height: number;
    showVolume: boolean;
}

/**
 * Bảng tính toán các công thức hình trụ
 * 
 * Công thức:
 * - Chu vi đáy: C = 2πr
 * - Diện tích xung quanh: Sxq = 2πrh
 * - Diện tích toàn phần: Stp = 2πr(r + h)
 * - Thể tích: V = πr²h
 */
export default function CalculationPanel({
    radius,
    height,
    showVolume,
}: CalculationPanelProps) {
    const PI = Math.PI;

    // Tính toán các giá trị
    const circumference = 2 * PI * radius; // Chu vi
    const lateralArea = 2 * PI * radius * height; // Sxq
    const totalArea = 2 * PI * radius * (radius + height); // Stp
    const volume = PI * radius * radius * height; // V

    return (
        <div className="calc-panel">
            <h3 className="calc-title">📊 THÔNG SỐ TÍNH TOÁN</h3>

            <div className="calc-section">
                <div className="calc-section-title">📐 DIỆN TÍCH</div>

                <div className="calc-row">
                    <div className="calc-formula">
                        <span className="calc-label">Chu vi đáy</span>
                        <span className="calc-expression">C = 2πr</span>
                    </div>
                    <div className="calc-result">
                        <span className="calc-value">{circumference.toFixed(2)}</span>
                        <span className="calc-unit">cm</span>
                    </div>
                </div>

                <div className="calc-row highlight">
                    <div className="calc-formula">
                        <span className="calc-label">DT xung quanh</span>
                        <span className="calc-expression">S<sub>xq</sub> = 2πrh</span>
                    </div>
                    <div className="calc-result">
                        <span className="calc-value">{lateralArea.toFixed(2)}</span>
                        <span className="calc-unit">cm²</span>
                    </div>
                </div>

                <div className="calc-row">
                    <div className="calc-formula">
                        <span className="calc-label">DT toàn phần</span>
                        <span className="calc-expression">S<sub>tp</sub> = 2πr(r+h)</span>
                    </div>
                    <div className="calc-result">
                        <span className="calc-value">{totalArea.toFixed(2)}</span>
                        <span className="calc-unit">cm²</span>
                    </div>
                </div>
            </div>

            <div className={`calc-section volume ${showVolume ? 'active' : ''}`}>
                <div className="calc-section-title">📦 THỂ TÍCH</div>

                <div className="calc-row featured">
                    <div className="calc-formula">
                        <span className="calc-label">Thể tích</span>
                        <span className="calc-expression">V = πr²h</span>
                    </div>
                    <div className="calc-result">
                        <span className="calc-value">{volume.toFixed(2)}</span>
                        <span className="calc-unit">cm³</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
