import { ActionTypes, SET_PERCENTAGES, UPDATE_PERCENTAGE } from './actions';
import { PercentageItem } from '../types';

interface State {
    percentages: PercentageItem[];
}

const initialState: State = {
    percentages: []
};

// Adjust percentages to sum to 100
const adjustPercentagesTo100 = (percentages: PercentageItem[], index: number, value: number): PercentageItem[] => {
    let remainingValue = value;
    const otherItems = percentages.filter((_, i) => i !== index);
    const totalOtherPercent = otherItems.reduce((sum, item) => sum + item.percent, 0);
    
    if (totalOtherPercent === 0) return percentages;

    let diff = percentages[index].percent - value;

    let newPercentages = [...percentages];
    newPercentages[index].percent = value;

    otherItems.forEach((item, i) => {
        const subtracted = diff * (item.percent / totalOtherPercent);
        newPercentages[i].percent += subtracted;
    });

    return newPercentages;
};

const reducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case SET_PERCENTAGES:
            return {
                ...state,
                percentages: action.payload
            };
        case UPDATE_PERCENTAGE:
            const newPercentages = adjustPercentagesTo100(
                state.percentages,
                action.payload.index,
                action.payload.value
            );
            return {
                ...state,
                percentages: newPercentages
            };
        default:
            return state;
    }
};

export default reducer;
