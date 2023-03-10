import React from "react";
import ArtemisDataSource from "../../infrastructure/artemisDataSource";
import {
  ExternallyOwnedAccounts,
  LocationType,
  P3Player,
} from "../../domain/model/type";
import GetCoordinates from "./GetCoordinates";

export default class ButtonSaveLocation extends React.Component<
  IProps,
  IState
> {
  private readonly artemisDataSource = new ArtemisDataSource();

  constructor(props: IProps) {
    super(props);
    this.state = {
      geolocationCoordinates: {
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
      },
    };
    this.saveLocation = this.saveLocation.bind(this);
    this.setCoordinates = this.setCoordinates.bind(this);
  }

  async saveLocation() {
    if (!this.props.accounts[0]) {
      const message = "Please connect to MetaMask.";
      alert(message);
      console.error(message);
      return;
    }
    if (
      this.state.geolocationCoordinates.latitude === 0 &&
      this.state.geolocationCoordinates.longitude === 0
    ) {
      const message = "Please allow geolocation.";
      alert(message);
      console.error(message);
      return;
    }
    const p3Player: P3Player = {
      walletAddress: this.props.accounts[0],
      artifacts: [],
      location: {
        type: LocationType.point,
        coordinates: [
          this.state.geolocationCoordinates.latitude.toString(),
          this.state.geolocationCoordinates.longitude.toString(),
        ],
      },
    };
    const artifacts = await this.artemisDataSource.putP3Players(p3Player);
    console.log(artifacts);
  }

  setCoordinates(coordinates: GeolocationCoordinates) {
    this.setState((prevState) => {
      const nextState: IState = prevState;
      nextState.geolocationCoordinates = coordinates;
      return nextState;
    });
  }

  render() {
    return (
      <div>
        <GetCoordinates setCoordinates={this.setCoordinates} />
        <button onClick={this.saveLocation}>Check Mintable Artifact</button>
      </div>
    );
  }
}

interface IProps {
  accounts: ExternallyOwnedAccounts;
}

interface IState {
  geolocationCoordinates: GeolocationCoordinates;
}
