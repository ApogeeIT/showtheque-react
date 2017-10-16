import { IShowStore } from '../show.reducer';
import * as React from 'react';
import { Link, RouterState, RouterProps } from 'react-router';
import { connect } from 'react-redux';


import { Show } from '../models/show';
import { Season } from '../models/season';

import { TextInput } from '../../common/components/text-input.component'
import { TextNumberInput } from '../../common/components/text-number-input.component'
import { Loading } from '../../common/components/loading.component'

import { ShowRepository } from '../services/show-repository.service';
import { ShowAction } from '../show-action';

interface StateProps {
    show: Show;
}

interface DispatchProps {
    updateShow: (show: Show) => void;
    getShow: (id: number) => void;
}

abstract class AppFormComppnent<P, S> extends React.Component<P, S> {

    constructor(props: P, context: S, private _name: string) {
        super(props, context);
    }

    protected onChange(e: React.FormEvent<{}>): void {
        let event: any = e, entity: any = this.state;
        entity[this._name][event.target.name] = event.target.value;
        let tmp: any = {};
        tmp[this._name] = entity[this._name];
        this.setState(tmp);
    }
}

class ShowEditContainer extends AppFormComppnent<StateProps & DispatchProps & RouterProps & RouterState, StateProps> {

    constructor(props: StateProps & DispatchProps & RouterProps & RouterState, context: StateProps) {
        super(props, context, 'show');

        this.props.getShow(+this.props.params['id']);
    }

    onChange2(e: React.FormEvent<{}>): void {
        this.onChange(e);
        this.props.updateShow(this.state.show);
    }

    save(e: React.FormEvent<{}>) {
        e.preventDefault();
        this.props.updateShow(this.state.show);
    }

    renderSeason(s: Season[]) {

        if (s) {
            return (
                <div>{s.map(a => <span key={a.number}>{a.number}</span>)}</div>
            );
        } else {
            return (<div></div>);
        }


    }

    render() {
        if (!this.props.show) {
            return (
                <div>
                    <h1>Shows&nbsp;<small>Edit #{this.props.show && this.props.show.id}</small></h1>
                    <div>
                        <Loading />
                    </div>
                </div>
            );
        }

        if (!this.state) {
            this.state = { show: this.props.show };
        }

        return (

            <div>
                <h1>Shows&nbsp;<small>Edit #{this.props.show.id}</small></h1>
                <form onSubmit={(e) => this.save(e)}>
                    <hr />
                    <h2>Show properties</h2>
                    <TextInput label="Title" name="title" onChange={(e) => this.onChange2(e)} value={this.props.show.title} />
                    <TextNumberInput label="Year" name="year" onChange={(e) => this.onChange(e)} value={this.props.show.year} />
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


const mapStateToProps = (state: IShowStore, ) => {
    return {
        show: state.show
    };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    let actions = new ShowAction(dispatch);
    return {
        updateShow: actions.updateShow,
        getShow: actions.getShow
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowEditContainer);
