import { Show } from '../models/show';
import * as $ from 'jquery';

export class ShowRepository {

    private static _shows: Show[];
    public static getShows(): Promise<Show[]> {

        return new Promise((resolve, reject) => {

            if (this._shows) {
                resolve(this._shows);
            } else {
                $.get('api/shows.json').then(
                    data => {
                        this._shows = data.entities;
                        resolve(this._shows);
                    }
                    , err => reject(err)
                );
            }
        });
    }

    public static deleteShow(id: number): Promise<Show> {

        return new Promise((resolve, reject) => {

            this.getShows().then((shows: Show[]) => {
                let idx = shows.findIndex(s => s.id === id);
                let show: Show;
                if (idx >= 0) {
                    show = shows[idx];
                    shows.splice(idx, 1);
                    resolve(show);
                } else {
                    reject();
                }
            }, err => reject(err));

        });
    }

    public static getShow(id: number): Promise<Show> {
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                this.getShows().then(
                    shows => resolve(shows.find(s => s.id === id)),
                    err => reject(err))
            }, 500);


        });
    }

    public static saveShow(show: Show): Promise<Show> {
        return new Promise((resolve, reject) => {

            this.getShows().then(shows => {

                if (show.id) {
                    let idx = shows.findIndex(s => s.id === show.id);
                    shows.splice(idx, 1, show);
                } else {
                    show.id = shows.reduce<any>((a, b) => { return { id: Math.max(a.id, b.id) } }, { id: 0 }).id + 1;
                    shows.push(show);
                }
                resolve(show);
            }, err => reject(err))

        });
    }
}