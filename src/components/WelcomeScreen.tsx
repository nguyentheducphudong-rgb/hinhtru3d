import { useState } from 'react';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
    onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
    const [exiting, setExiting] = useState(false);

    const handleStart = () => {
        setExiting(true);
        setTimeout(() => {
            onStart();
        }, 800); // Wait for exit animation
    };

    return (
        <div className={`welcome-container ${exiting ? 'exiting' : ''}`}>
            <div className="welcome-content">
                <div className="welcome-badge">MÔ PHỎNG 3D</div>

                <h1 className="welcome-title">
                    <span className="text-gradient">HÌNH TRỤ</span>
                </h1>



                {/* CSS Cylinder Animation */}
                <div className="css-cylinder-container">
                    <div className="cylinder-shape">
                        <div className="cyl-top"></div>
                        <div className="cyl-side"></div>
                        <div className="cyl-bottom"></div>
                    </div>
                </div>

                <div className="welcome-actions">
                    <button className="start-btn" onClick={handleStart}>
                        <span className="btn-text">BẮT ĐẦU BÀI HỌC</span>
                        <span className="btn-icon">🚀</span>
                    </button>

                    <div className="author-tag">
                        Phát triển bởi: @ thầy Thế Đức - Giáo viên yêu công nghệ 💙
                    </div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="grid-overlay"></div>
        </div>
    );
};

export default WelcomeScreen;
