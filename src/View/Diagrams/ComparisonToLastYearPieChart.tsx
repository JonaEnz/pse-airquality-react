import React from 'react'
import Diagram from './Diagram';
import { IDiagramProps } from './Diagram';

export default class ComparisonToLastYearPieChart extends Diagram {

    constructor(props: IDiagramProps) {
        super(props);
    }

    render() {
        return (
            <h1>ComparisonToLastYearPieChart</h1>
        );
    }

}