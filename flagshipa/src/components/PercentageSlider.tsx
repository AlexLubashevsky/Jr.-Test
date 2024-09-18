import React from 'react';
import Slider from 'react-slider';

interface Props {
    name: string;
    percent: number;
    onPercentChange: (value: number) => void;
}

const PercentageSlider: React.FC<Props> = ({ name, percent, onPercentChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(',', '.'); // Replace commas with periods
        const floatValue = parseFloat(value);

        if (!isNaN(floatValue) && floatValue >= 0 && floatValue <= 100) {
            onPercentChange(floatValue);
        }
    };

    return (
        <div className="percentage-slider">
            <label>{name}</label>
            <input
                type="text"
                value={percent.toFixed(2)} // Show the value with two decimal places
                onChange={handleInputChange}
                maxLength={6} // Limit input length
            />
            <Slider
                value={percent}
                min={0}
                max={100}
                step={0.01}
                onChange={(value: number) => onPercentChange(value)}
            />
        </div>
    );
};

export default PercentageSlider;
