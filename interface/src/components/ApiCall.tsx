import React from "react";
import ArtemisDataSource from "../infrastructure/artemisDataSource";

export default class ApiCall extends React.Component<IProps, IState> {
  private readonly artemisDataSource = new ArtemisDataSource();

  constructor(props: IProps) {
    super(props);
    this.myFunc = this.myFunc.bind(this);
  }

  async myFunc() {
    console.log("try!");
    const data = await this.artemisDataSource.getP3Players();
    console.log(data);
  }

  render() {
    return (
      <div>
        <button onClick={this.myFunc}>Fetch Data</button>
      </div>
    );
  }
}

interface IProps {}
interface IState {}
