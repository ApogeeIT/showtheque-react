import { IShowStore } from '../show.reducer';
import * as React from 'react';
import { Link, RouterState } from 'react-router';
import { connect } from 'react-redux';


import { Show } from '../models/show';
import { Season } from '../models/season';

import { TextInput } from '../../common/components/text-input.component'
import { TextNumberInput } from '../../common/components/text-number-input.component'
import { Loading } from '../../common/components/loading.component'

import { ShowRepository } from '../services/show-repository.service';
import {ShowAction} from '../show-action';

interface StateProps {
    show: Show;
}

interface DispatchProps {
    saveShow: (show: Show) => void;
    getShow: (id: number) => void;
}

abstract class AppFormComppnent<P, S> extends React.Component<P, S> {
    protected onChange(e: React.FormEvent<{}>): void {
        let event: any = e, entity: any = this.state;
        entity['show'][event.target.name] = event.target.value;
        let tmp: any = {};
        tmp['show'] = entity['show'];
        this.setState(tmp);
    }
}

class ShowEditContainer extends AppFormComppnent<StateProps & DispatchProps & RouterState, StateProps> {

    constructor(props: StateProps & DispatchProps & RouterState, context: any) {
        super(props, context);

        //this.state = new StateState();
        //this.state.id = +this.props.params['id'] || 0;

        console.log(this.props.params['id']);



        /*
        if (this.state.id) {
            ShowRepository.getShow(this.state.id).then(show => {
                show.seasons = [new Season(1)];
                //this.state.show = show;
                this.setState(this.state)
            });
        } else {
            //this.state.show = new Show();
        }*/

        /*
        this.state.show.id = +this.props.params['id'] || 0;
        this.state.show.title = 'le nouveau';
        this.state.show.year = 2015;*/


    }

    renderSeason(s: Season[]) {

        if (s) {
            return (
                <div>{s.map(a => <span>{a.number}</span>)}</div>
            );
        } else {
            return (<div></div>);
        }


    }

    render() {
        if (!this.props.show) {
            return (
                <div>
                    <h1>Shows&nbsp;<small>Edit #{this.props.show.id}</small></h1>
                    <div>
                        <Loading />
                    </div>
                </div>
            );
        }

        return (

            <div>
                <h1>Shows&nbsp;<small>Edit #{this.props.show.id}</small></h1>
                <form>
                    <hr />
                    <h2>Show properties</h2>
                    <TextInput label="Title" onChange={(e) => this.onChange(e)} name="title" value={this.props.show.title} error="une errue" />
                    <TextNumberInput label="Title" onChange={(e) => this.onChange(e)} name="year" value={this.props.show.year} />
                    <hr />
                    <h2>Seasons</h2>
                    <blockquote>
                        {this.renderSeason(this.props.show.seasons)}
                    </blockquote>
                    <input type="submit" className="btn btn-success btn-lg" value="Save" />
                    &nbsp;
                    <Link to="/shows" className="btn btn-secondary btn-lg">Cancel</Link>
                </form>
            </div>
        );
    }
}


const mapStateToProps = (state: IShowStore) => {
    return {
        show: state.shows[0]
    };
};

const mapDispatchToProps = (dispatch: (fn: any) => void): DispatchProps => {
    return {
        saveShow: (show: Show) => dispatch(ShowAction.updateShow(show)),
        getShow: (id: number) => dispatch(ShowAction.getShow(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowEditContainer);
