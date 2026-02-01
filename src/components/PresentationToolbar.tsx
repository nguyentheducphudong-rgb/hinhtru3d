import './PresentationToolbar.css';
import type { DrawingTool } from './DrawingCanvas';

interface PresentationToolbarProps {
    activeTool: DrawingTool;
    color: string;
    onToolChange: (tool: DrawingTool) => void;
    onColorChange: (color: string) => void;
    onClear: () => void;
}

export default function PresentationToolbar({
    activeTool,
    color,
    onToolChange,
    onColorChange,
    onClear
}: PresentationToolbarProps) {
    const colors = ['#ef5350', '#ffca28', '#66bb6a', '#42a5f5', '#ab47bc', '#ffffff'];

    const tools: { id: DrawingTool; icon: string; label: string }[] = [
        { id: 'none', icon: '👆', label: 'Chọn' },
        { id: 'pen', icon: '🖊️', label: 'Bút' },
        { id: 'highlighter', icon: '🖍️', label: 'Nhớ' },
        { id: 'laser', icon: '🔴', label: 'Laser' },
        { id: 'eraser', icon: '🧹', label: 'Tẩy' },
    ];

    return (
        <div className="presentation-toolbar">
            <div className="toolbar-group">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                        onClick={() => onToolChange(tool.id)}
                        title={tool.label}
                    >
                        {tool.icon}
                    </button>
                ))}
            </div>

            <div className="divider"></div>

            <div className="toolbar-group colors">
                {colors.map((c) => (
                    <button
                        key={c}
                        className={`color-btn ${color === c ? 'active' : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => onColorChange(c)}
                    />
                ))}
            </div>

            <div className="divider"></div>

            <button className="tool-btn clear-btn" onClick={onClear} title="Xóa tất cả">
                🗑️
            </button>
        </div>
    );
}
