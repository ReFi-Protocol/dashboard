import { ReactNode } from "react";

export const Env = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
} as const;

export type Env = (typeof Env)[keyof typeof Env];

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

export interface NFTInfo {
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string | number }[] | null;
}

export interface WidgetData {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export interface StakingPoolData {
  duration: number | null;
  maxStake: string;
  apy: string;
}
