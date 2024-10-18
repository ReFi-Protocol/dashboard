import { FC, useEffect, useState } from "react";
import { WidgetData } from "../../../types";

import { ProgramConfig, Stake } from "../../../web3/solana/staking/types";
import MetricsSection from "../../MetricSection";
import {  SumIcon, } from "../../icons";
import { decimals } from "../../../web3/evm/config";
import { APY_DECIMALS, SPL_DECIMALS } from "../../../web3/solana/const";
import { d } from "../../../web3/util/d";

function truncateAddress(address: string, startLength: number = 8, endLength: number = 8): string {
  if (!address) return '';
  
  if (address.length <= startLength + endLength) {
    return address;
  }

  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);
  return `${start}...${end}`;
}

type CurrentConfigProps = {
  config: ProgramConfig;
};

const CurrentConfig: FC<CurrentConfigProps> = ({config}) => {
const {admin, maxNftApyDurationDays, maxNftRewardLamports, baseApy, nftCollection, nftDaysApy, baseLockDays} = config;


function mapApy(apys: typeof nftDaysApy): {title: string, subtitle: string}[] {
return apys.map((apy) => ({title: `${apy.days} days NFT APY`, subtitle: `${d(apy.apy, APY_DECIMALS)}%`}))
}


  const widgets: WidgetData[] = [
    {
      title: "Admin Address",
      subtitle: `${truncateAddress(admin.toString())}`,
    },
    {
      title: "Collection Address",
      subtitle: `${truncateAddress(nftCollection.toString())}`,
    },
    {
      title: "Max NFT Duration",
      subtitle: `${maxNftApyDurationDays}`,
    },
    {
      title: "Max NFT Reward",
      subtitle: `${d(maxNftRewardLamports.toNumber(), SPL_DECIMALS)}`,
    },
    ...mapApy(nftDaysApy),
    {
      title: "Base Apy",
      subtitle: `${baseApy / 10 ** APY_DECIMALS}%`,
    },
    {
      title: "Base lock days",
      subtitle: `${baseLockDays}`,
    },
  ];

  return <MetricsSection title="Current Config" metricsWidgets={widgets} />;
};

export default CurrentConfig;
