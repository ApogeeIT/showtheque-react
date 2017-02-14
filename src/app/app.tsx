import * as React from 'react';
import { Link, IndexLink } from 'react-router';

interface AppProps { loading: boolean; children: React.ReactElement<{}>; }

export class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <div>
                <nav className="navbar navbar-toggleable navbar-inverse fixed-top bg-inverse">
                    <div className="container">
                        <button className="navbar-toggler navbar-toggler-right" type="button">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <IndexLink to="/home" className="navbar-brand" activeClassName="active"><i className="fa fa-home"></i></IndexLink>
                        <div className="navbar-collapse collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item"><Link className="nav-link" to="/home" activeClassName="active">Home</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/shows" activeClassName="active">Shows</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

/*let mapStateToProps = (state, ownProps) => {
    return {
        loading: state.asyncCallNumber > 0
    };
};*/


const mapStateToProps = (state: any, ownProps: any) => {
    return {
        loading: true
    };
};
