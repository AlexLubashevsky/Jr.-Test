import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPercentages, updatePercentage } from './store/actions';
import PercentageSlider from './components/PercentageSlider';
import { PercentageItem } from './types';

const App: React.FC = () => {
    const percentages = useSelector((state: any) => state.percentages);
    const dispatch = useDispatch();

    useEffect(() => {
        // Simulate fetching JSON from the server
        const fetchData = async () => {
            const response = await fetch('/data/percentages.json');
            const data: PercentageItem[] = await response.json();

            let total = data.reduce((sum, item) => sum + item.percent, 0);

            if (total !== 100 && data.length > 1) {
                // Adjust to sum to 100
                const diff = 100 - total;
                data[0].percent += diff;
            }

            dispatch(setPercentages(data));
        };

        fetchData();
    }, [dispatch]);

    const handlePercentChange = (index: number, value: number) => {
        dispatch(updatePercentage(index, value));
    };

    return (
        <div className="app">
            {percentages.map((item: PercentageItem, index: number) => (
                <PercentageSlider
                    key={index}
                    name={item.name}
                    percent={item.percent}
                    onPercentChange={(value) => handlePercentChange(index, value)}
                />
            ))}
        </div>
    );
};

export default App;
