import { store } from '../store';
import { Action } from 'redux';
import { Show } from './models/show';
import * as $ from 'jquery';

export interface IShowAction extends Action {
    type: string;
    value?: Show;
    values?: Show[];
    request?: any;
}

export class ShowAction {

    static SHOW_ADD = 'SHOW_ADD';
    static SHOW_REMOVE = 'SHOW_REMOVE';
    static SHOW_GET_ALL = 'SHOW_GET_ALL';
    static SHOW_GET_ALL_SUCCESS = 'SHOW_GET_ALL_SUCCESS';
    static SHOW_GET_ALL_ERROR = 'SHOW_GET_ALL_ERROR';
    static SHOW_GET_ONE = 'SHOW_GET_ONE';
    static SHOW_GET_ONE_SUCCESS = 'SHOW_GET_ONE_SUCCESS';
    static SHOW_UPDATE = 'SHOW_UPDATE';

    constructor(private _dispatch: any) {

    }

    public addShow = (show: Show): IShowAction => ({
        type: ShowAction.SHOW_ADD,
        value: show
    })

    public removeShow = (show: Show): IShowAction => this._dispatch({
        type: ShowAction.SHOW_REMOVE,
        value: show
    })

    public getShows = (): void => {

        let shows = store.getState().shows;

        if (shows && shows.length) {
            //this._dispatch(this.getShowsSuccess(shows));
        } else {
            let req = $.get('/api/shows.json').then((ok: any) => {
                setTimeout(() => {
                    this._dispatch(this.getShowsSuccess(ok.entities));
                }, 500);
            });

            this._dispatch({
                type: ShowAction.SHOW_GET_ALL
            });
        }


    }

    private getShowsSuccess = (shows: Show[]): IShowAction => ({
        type: ShowAction.SHOW_GET_ALL_SUCCESS,
        values: shows
    })

    static getShowsError = (): IShowAction => ({
        type: ShowAction.SHOW_GET_ALL_ERROR
    })

    public getShow = (id: number): void => {

        let req = $.get('/api/shows.json').then((ok: any) => {
            setTimeout(() => {
                let show = ok.entities.find((e: Show) => e.id === id);
                this._dispatch(this.getShowSuccess(show));
            }, 5000);
        });

        this._dispatch({
            type: ShowAction.SHOW_GET_ONE
        });
    }

    private getShowSuccess = (show: Show): IShowAction => this._dispatch({
        type: ShowAction.SHOW_GET_ONE_SUCCESS,
        value: show
    })

    public updateShow = (show: Show): IShowAction => this._dispatch({
        type: ShowAction.SHOW_UPDATE,
        value: show
    })

}


