import { Action } from 'redux';
import { Show } from './models/show';

export interface IShowAction extends Action {
    type: string;
    value?: Show;
}

export class ShowAction {

    static SHOW_ADD = 'SHOW_ADD';
    static SHOW_REMOVE = 'SHOW_REMOVE';
    static SHOW_GET_ALL = 'SHOW_GET_ALL';
    static SHOW_GET_ONE = 'SHOW_GET_ONE';
    static SHOW_UPDATE = 'SHOW_UPDATE';

    static addShow = (show: Show): IShowAction => ({
        type: ShowAction.SHOW_ADD,
        value: show
    })

    static removeShow = (show: Show): IShowAction => ({
        type: ShowAction.SHOW_REMOVE,
        value: show
    })

    static getShows = (): IShowAction => ({
        type: ShowAction.SHOW_GET_ALL
    })

    static getShow = (id: number): IShowAction => ({
        type: ShowAction.SHOW_GET_ONE
    })

    static updateShow = (show: Show): IShowAction => ({
        type: ShowAction.SHOW_UPDATE
    })

}


