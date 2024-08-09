export interface AppRoute {
  name: string;
  layout: string;
  path: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  secondary?: boolean;
}

export interface NFTMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
  properties: {
    files: {
      uri: string;
      type: string;
    }[];
  };
}
