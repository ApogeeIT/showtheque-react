import { IShowStore } from '../show.reducer';
import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Show } from '../models/show';
import { Loading } from '../../common/components/loading.component'
import { ShowRepository } from '../services/show-repository.service';
import { ShowAction } from '../show-action';


interface StateProps {
    shows: Show[];
    loading: boolean;
}

interface DispatchProps {
    addShow: (show: Show) => void;
    removeShow: (show: Show) => void;
    getShows: () => void;
}

class ShowListContainer extends React.Component<StateProps & DispatchProps, StateProps> {


    constructor(props: IShowStore & DispatchProps, context: any) {
        super(props, context);
        this.props.getShows();

        //this.setState({});

        /*    
                ShowRepository.getShows().then(shows => {
                    this.state.shows = shows;
                    this.setState(this.state);
                });
            }*/
    }

    showRow(show: Show, index: number) {
        return (
            <tr key={index}>
                <td>{show.id}</td>
                <td>{show.title}</td>
                <td>{show.seasons ? show.seasons.length : 0}</td>
                <td>{show.seasons ? show.seasons.map(s => s.episodes ? s.episodes.length : 0) : 0}</td>
                <td>
                    <Link to={'/show/' + show.id} className="btn btn-primary btn-sm"><i className="fa fa-pencil-square-o fa-lg"></i></Link>
                    &nbsp;
                    <a onClick={() => this.props.removeShow(show)} className="btn btn-danger btn-sm" href="javascript:;"><i className="fa fa-trash fa-lg"></i></a>
                </td>
            </tr>);
    }

    header() {
        // <Link className="btn btn-success pull-right" to="/show/0">Add</Link>
        return (
            <h1>Shows <small>List</small>
                <a onClick={() => this.props.addShow(new Show())}>Add</a>
            </h1>
        );
    }

    render() {

        const { shows, loading } = this.props;

        if (loading) {
            return (
                <div>
                    {this.header()}
                    <div>
                        <Loading />
                    </div>
                </div>
            );
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
                        {shows && shows.map((show, idx) => this.showRow(show, idx))}
                    </tbody>
                </table>
            </div>
        );
    }
}

let mapStateToProps = (state: IShowStore): StateProps => ({
    shows: state.shows,
    loading: state.loading
});

let mapDispatchToProps = (dispatch: any): DispatchProps => {
    let actions = new ShowAction(dispatch);
    return {
        addShow: actions.addShow,
        removeShow: actions.removeShow,
        getShows: actions.getShows
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowListContainer);
