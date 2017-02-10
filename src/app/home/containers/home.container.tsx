import * as React from 'react';
import { Link } from 'react-router';

export default class HomeContainer extends React.Component<{}, {}> {
    render () {
        return (
            <div className="jumbotron">
                <h1>ShowTheque - React</h1>
                <p>Managing TV Show</p>
                <Link to="shows" className="btn btn-success btn-lg">Start ...</Link>
            </div>
        );
    }
}
