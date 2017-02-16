import { IShowAction, ShowAction } from './show-action';
import { Show } from './models/show';
import { createStore } from 'redux';

export interface IShowStore {
    shows: Show[];
    show: Show;
    loading: boolean;
}

export const showReducer = (state: IShowStore, action: IShowAction): IShowStore => {
    switch (action.type) {
        case ShowAction.SHOW_ADD:
            return {
                ...state,
                shows: [...state.shows, new Show()]
            };
        case ShowAction.SHOW_UPDATE:
            let idxToUpdate = state.shows.findIndex(s => s.id === action.value.id);
            return {
                ...state,
                shows: [...state.shows.splice(idxToUpdate, 1, action.value)]
            };
        case ShowAction.SHOW_REMOVE:
            let idxToRemove = state.shows.findIndex(s => s.id === action.value.id);
            let shows = [...state.shows];
            shows.splice(idxToRemove, 1);
            return {
                ...state,
                shows: shows
            };
        case ShowAction.SHOW_GET_ALL:
            return {
                ...state,
                shows: [],
                loading: true
            };
        case ShowAction.SHOW_GET_ALL_SUCCESS:
            return {
                ...state,
                shows: action.values,
                loading: false
            };
        case ShowAction.SHOW_GET_ALL_ERROR:
            return {
                ...state,
                shows: undefined,
                loading: false
            };
        case ShowAction.SHOW_GET_ONE:
            return {
                ...state,
                show: undefined,
                loading: true
            };
        case ShowAction.SHOW_GET_ONE_SUCCESS:
        console.log(action.value);
            return {
                ...state,
                show: action.value,
                loading: false
            };
        default:
            return state;
    }
};
