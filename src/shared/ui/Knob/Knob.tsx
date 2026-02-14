import React, { useState, useEffect, useRef, useCallback } from 'react';
import classes from './Knob.module.css';

interface Props {
    label: string;
    min: number;
    max: number;
    initValue: number;
    onChange: (val: number) => void;
}

const Knob = (props: Props) => {
    const { label, min, max, initValue, onChange } = props;
    
    const [value, setValue] = useState(initValue);
    const isDragging = useRef(false);
    const lastY = useRef(0);

    const percent = (value - min) / (max - min);
    const rotation = (percent * 270) - 135;

    const updateValue = useCallback((deltaY: number) => {
        setValue((prev) => {
            const range = max - min;
            const step = range / 200;
            const newValue = Math.max(min, Math.min(max, prev + deltaY * step));
            
            if (newValue !== prev) {
                onChange(newValue);
            }
            return newValue;
        });
    }, [min, max, onChange]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            const deltaY = lastY.current - e.clientY;
            lastY.current = e.clientY;
            updateValue(deltaY);
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            document.body.style.cursor = 'default';
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging.current) return;
            const deltaY = lastY.current - e.touches[0].clientY;
            lastY.current = e.touches[0].clientY;
            updateValue(deltaY);
        };

        const handleTouchEnd = () => {
            isDragging.current = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [updateValue]);

    const onStart = (clientY: number) => {
        isDragging.current = true;
        lastY.current = clientY;
        document.body.style.cursor = 'ns-resize';
    };

    return (
        <div className={classes.knobContainer}>
            <p className={classes.label}>{label}</p>
            <div 
                className={classes.knobOuter}
                onMouseDown={(e) => onStart(e.clientY)}
                onTouchStart={(e) => onStart(e.touches[0].clientY)}
                style={{ touchAction: 'none' }}
            >
                <div 
                    className={classes.knobIndicator}
                    style={{ transform: `rotate(${rotation}deg)` }}
                ></div>
            </div>
            <p className={classes.label}>{value.toFixed(2)}</p>
        </div>
    );
}

export default Knob;