import * as React from 'react';
import { Link } from 'react-router';

import { Show } from '../models/show';
import { Loading } from '../../common/components/loading.component'

import { ShowRepository } from '../services/show-repository.service';

class StateProps {
    shows: Show[];
}

interface DispatchProps {
    deleteShow: (id: number) => void;
}

export default class ShowListContainer extends React.Component<StateProps & DispatchProps, StateProps> {


    constructor(props: StateProps & DispatchProps, context: any) {
        super(props, context);

        this.state = new StateProps();

        ShowRepository.getShows().then(shows => {
            this.state.shows = shows;
            this.setState(this.state);
        });
    }

    deleteShow(show: Show) {
        ShowRepository.deleteShow(show.id).then(
            () => {
                this.state.shows = this.state.shows.filter(s => s.id !== show.id);
                this.setState(this.state)
            }
        );
    }

    showRow(show: Show, idx: number) {
        return (
            <tr key={show.id}>
                <td>{show.id}</td>
                <td>{show.title}</td>
                <td>{show.seasons ? show.seasons.length : 0}</td>
                <td>{show.seasons ? show.seasons.map(s => s.episodes ? s.episodes.length : 0) : 0}</td>
                <td>
                    <Link to={'/show/' + show.id} className="btn btn-primary btn-sm"><i className="fa fa-pencil-square-o fa-lg"></i></Link>
                    &nbsp;
                    <a onClick={() => this.deleteShow(show)} className="btn btn-danger btn-sm" href="javascript:;"><i className="fa fa-trash fa-lg"></i></a>
                </td>
            </tr>);
    }

    header(){
        return (
            <h1>Shows <small>List</small><Link className="btn btn-success pull-right" to="/show/">Add</Link></h1>
        );
    }

    render() {

        if (!this.state.shows) {
            return (
                <div>
                    {this.header()}
                    <div>
                        <Loading />
                    </div>
                </div>
            )
        }

        return (
            <div>
                {this.header()}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Seasons</th>
                            <th>Episodes</th>
                            <th style={{ width: '140px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.shows && this.state.shows.map(this.showRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
}
