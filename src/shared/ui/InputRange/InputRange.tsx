import { ChangeEvent } from "react";
import classes from './Input.module.css';

interface Props {
    defaultValue?: string;
    min?: string;
    max?: string;
    step?: string;
    text: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputRange = (props: Props) => {
    const { text, defaultValue, min, max, step, onChange } = props;

    return (
        <div className={classes.wrapper}>
            <label htmlFor={text} className={classes.label}>{text}</label>
            <input type="range"
                className={classes.input} 
                onChange={onChange} 
                defaultValue={defaultValue} 
                min={min} 
                max={max} 
                step={step} 
                id={text} 
                name={text}
            />
        </div>
    )
}

export default InputRange