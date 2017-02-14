import { IShowAction, ShowAction } from './show-action';
import { Show } from './models/show';
import { createStore } from 'redux';

export interface IShowStore {
    shows: Show[];
}

export const showReducer = (state: IShowStore, action: IShowAction): IShowStore => {
    switch (action.type) {
        case ShowAction.SHOW_ADD:
            return {
                ...state,
                shows: [...state.shows, new Show()]
            };
        case ShowAction.SHOW_UPDATE:
            let idx = state.shows.findIndex(s => s.id === action.value.id);
            return {
                ...state,
                shows: [...state.shows.splice(idx, 1, action.value)]
            };
        case ShowAction.SHOW_REMOVE:
            return {
                ...state,
                shows: [...state.shows.splice(1)]
            };
        case ShowAction.SHOW_GET_ALL:
            return state;
        default:
            return state;
    }
};
