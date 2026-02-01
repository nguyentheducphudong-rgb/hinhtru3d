import './PillButton.css';

interface PillButtonProps {
    label: string;
    color: string;
    active: boolean;
    onClick: () => void;
    icon?: string;
}

export default function PillButton({
    label,
    color,
    active,
    onClick,
    icon,
}: PillButtonProps) {
    return (
        <button
            className={`pill-button ${active ? 'active' : ''}`}
            onClick={onClick}
            style={{
                '--button-color': color,
                '--button-glow': `${color}50`,
            } as React.CSSProperties}
        >
            {icon && <span className="pill-icon">{icon}</span>}
            <span className="pill-label">{label}</span>
        </button>
    );
}
