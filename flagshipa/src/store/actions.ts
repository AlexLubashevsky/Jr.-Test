import { PercentageItem } from '../types';

export const SET_PERCENTAGES = 'SET_PERCENTAGES';
export const UPDATE_PERCENTAGE = 'UPDATE_PERCENTAGE';

interface SetPercentagesAction {
    type: typeof SET_PERCENTAGES;
    payload: PercentageItem[];
}

interface UpdatePercentageAction {
    type: typeof UPDATE_PERCENTAGE;
    payload: { index: number, value: number };
}

export type ActionTypes = SetPercentagesAction | UpdatePercentageAction;

export const setPercentages = (data: PercentageItem[]): ActionTypes => ({
    type: SET_PERCENTAGES,
    payload: data
});

export const updatePercentage = (index: number, value: number): ActionTypes => ({
    type: UPDATE_PERCENTAGE,
    payload: { index, value }
});
