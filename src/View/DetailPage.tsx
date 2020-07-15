import React from "react";
import { Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import ErrorPage from "./ErrorPage";

export default class DetailPage extends React.Component<
    IDetailPageProps,
    IDetailPageState
> {
    observationStationId: string;

    constructor(props: IDetailPageProps) {
        super(props);
        this.observationStationId = this.props.match.params.id;
    }

    //Todo: Diese Methode überprüft über den DataProvider, ob eine ObservationStation mit der übergebenen id existiert
    observationStationExists(observationStationId: string): boolean {
        return true;
    }

    render() {
        if (this.observationStationExists(this.observationStationId)) {
            return (
                <Fragment>
                    <h1>Detail Page</h1>
                    <p>
                        {" "}
                        von Messstation mit der id: {this.props.match.params.id}
                    </p>
                </Fragment>
            );
        } else {
            var errorCode = 404;
            //Todo: error Message sollte über eine string id in verschiedenen Sprachen abgerufen werden können
            var errorMessage =
                "There is no observation station with the id: " +
                this.observationStationId;
            return (
                <Fragment>
                    <ErrorPage code={errorCode} message={errorMessage} />
                </Fragment>
            );
        }
    }
}

interface IDetailPageProps extends RouteComponentProps<{ id: string }> {}

interface IDetailPageState {}
