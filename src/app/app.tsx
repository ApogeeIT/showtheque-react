import * as React from 'react';
import { Link, IndexLink } from 'react-router';

interface AppProps { loading: boolean; children: React.ReactElement<{}>; }

class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-inverse navbar-full navbar-fixed-top">
                    <div className="container">
                        <IndexLink to="/home" className="navbar-brand pull-right" activeClassName="active">Home</IndexLink>
                        <ul className="nav navbar-nav float-xs-right">
                            <li className="nav-item"><Link className="nav-link" to="/home" activeClassName="active">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/shows" activeClassName="active">Shows</Link></li>
                        </ul>
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

export default App;