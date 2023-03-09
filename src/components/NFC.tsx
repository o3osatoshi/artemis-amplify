import React from "react";

export default class NFC extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      readData: "",
    };
    this.scan = this.scan.bind(this);
  }

  componentDidMount() {
    this.scan().then();
  }

  async scan() {
    if ("NDEFReader" in window) {
      try {
        // @ts-ignore
        const ndef = new window.NDEFReader();
        console.log("Scan start.");
        console.log(ndef);
        await ndef.scan();

        console.log("Scan started successfully.");
        ndef.onreadingerror = () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = (event: any) => {
          console.log("NDEF message read.");
          this.onReading(event); //Find function below
        };
      } catch (error) {
        console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  }

  // @ts-ignore
  onReading({ message, serialNumber }) {
    console.log(serialNumber);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          console.log(textDecoder.decode(record.data));
          this.setState((prevState) => {
            const nextState: IState = prevState;
            nextState.readData = textDecoder.decode(record.data);
            return nextState;
          });
          break;
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  }

  render() {
    return (
      <>
        <p>{this.state.readData}</p>
      </>
    );
  }
}

interface IProps {}

interface IState {
  readData: string;
}
