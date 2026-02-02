import type { ChangeEvent } from 'react';
import './Slider.css';

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onChange: (value: number) => void;
    showInput?: boolean;
    color?: string;
}

export default function Slider({
    label,
    value,
    min,
    max,
    step = 1,
    unit = '',
    onChange,
    showInput = true,
    color = '#4dd0e1',
}: SliderProps) {
    const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(parseFloat(e.target.value));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            onChange(newValue);
        }
    };

    // Tính % cho gradient
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="slider-container">
            <div className="slider-header">
                <span className="slider-label">{label}</span>
                {showInput && (
                    <div className="slider-input-wrapper">
                        <input
                            type="number"
                            className="slider-input"
                            value={value}
                            min={min}
                            max={max}
                            step={step}
                            onChange={handleInputChange}
                        />
                        {unit && <span className="slider-unit">{unit}</span>}
                    </div>
                )}
            </div>
            <input
                type="range"
                className="slider-range"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={handleSliderChange}
                style={{
                    background: `linear-gradient(to right, ${color} ${percentage}%, #2a3a5a ${percentage}%)`,
                }}
            />
            <div className="slider-bounds">
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
            </div>
        </div>
    );
}
