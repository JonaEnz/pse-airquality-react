import React from 'react';
import { Fragment } from 'react';

export default class MapPage extends React.Component{
    constructor(props: any) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <h1>Map Page</h1>
            </Fragment>
        );
    }
}

interface IMapPageProps{}

interface IMapPageState{}