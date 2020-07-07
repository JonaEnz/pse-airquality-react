import React from 'react';
import Fragment from 'react';
import './DetailPage.css';
import { Grid } from '@material-ui/core';

import ObservationStationProfile from './ObservationStationProfile';
import DataProvider from '../Controller/DataProvider'

export default class DetailPage extends React.Component<IDetailPageProps, IDetailPageState> {

    constructor(props: IDetailPageProps) {
        super(props);

    }

    styles = {
        root: {
            height: '100%'
        },
        content: {
            alignItems: 'center',
            display: 'flex'
        },
        title: {
            fontWeight: 700
        },
        avatar: {
            backgroundColor: '#ffffff',
            height: 56,
            width: 56
        },
        icon: {
            height: 32,
            width: 32
        },
        difference: {
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center'
        },
        differenceIcon: {
            color: '#000000'
        },
        differenceValue: {
            color: '#000000',
            marginRight: '10px'
        }
    }

    render() {
        return (
            <Fragment>
                <Grid container spacing={4}>
                    <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <ObservationStationProfile observationStation={} />
                    </Grid>
                </Grid>

            </Fragment>

        );
    }

}

interface IDetailPageProps {
    id: string;
}

interface IDetailPageState { }