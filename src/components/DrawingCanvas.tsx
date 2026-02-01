import { forwardRef, useImperativeHandle } from 'react';
import './DrawingCanvas.css';

export type DrawingTool = 'none' | 'pen' | 'highlighter' | 'laser' | 'eraser';

interface DrawingCanvasProps {
    width: number;
    height: number;
    activeTool: DrawingTool;
    color: string;
    onClear?: () => void;
}

export interface DrawingCanvasRef {
    clearCanvas: () => void;
}

// DUMMY VERSION FOR DEBUGGING
const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        clearCanvas: () => console.log("Clear canvas called")
    }));

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: props.width,
            height: props.height,
            border: '2px solid red', // Visual debug
            pointerEvents: 'none',
            zIndex: 100
        }}>
            Drawing Canvas Placeholder
        </div>
    );
});

export default DrawingCanvas;
