import React from 'react';

import Diagram from './Diagram';
import { IDiagramProps } from './Diagram';

export default class FeatureHistoryLineChart extends Diagram {

    constructor(props: IDiagramProps) {
        super(props);
    }

    render() {
        return (
            <h1>FeatureHistoryLineChart</h1>
        );
    }

}