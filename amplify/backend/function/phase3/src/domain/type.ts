export enum ChainId {
  ethereum = 1,
  goerli = 5,
  polygon = 137,
  mumbai = 80001,
}

export type ExternallyOwnedAccount = string;

export type ExternallyOwnedAccounts = Array<ExternallyOwnedAccount>;

export interface P3Player {
  walletAddress: WalletAddress;
  artifacts: Array<TokenId>;
  location: {
    id?: {
      type: LocationIdType;
      value: string;
    };
    type: LocationType;
    coordinates: Array<string>;
  };
}

export type WalletAddress = string;

export type TokenId = string;

export type TokenURI = string;

export enum LocationIdType {
  beacon = "beacon",
  nfc = "nfc",
  qr = "qr",
}

export enum LocationType {
  point = "Point",
}

export interface P3Artifact {
  id: TokenId;
  uri: TokenURI;
  level: string;
  individualValue: string;
  species: Species;
  appearance: Appearance;
}

export type P3Artifacts = Array<P3Artifact>;

export interface Species {
  id: string;
  name: string;
  mint: Mint;
  Transform?: Transform;
}

export interface Mint {
  id: string;
  labels: Array<Label>;
  conditions: Conditions;
}

export enum Label {
  location = "location",
  weather = "weather",
  individualValue = "individualValue",
  elapsedTime = "elapsedTime",
  lastLocation = "lastLocation",
}

export interface Transform {
  id: string;
  labels: Array<Label>;
  conditions: Conditions;
}

export interface Conditions {
  location?: Location;
}

export interface Location {
  id: string;
  type: string;
  coordinates: Array<string>;
}

export interface Appearance {
  location: {
    type: LocationType;
    coordinates: Array<string>;
  };
  weather: Weather;
}

export interface Weather {
  temperature: string;
  stationPressure: string;
  windSpeed: string;
}
