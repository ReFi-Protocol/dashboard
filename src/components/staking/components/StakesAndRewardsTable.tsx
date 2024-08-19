import { FC } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import { Stake } from "../../../web3/solana/staking/types";
import {
  calculateClaimableReward,
  formatReFi,
} from "../../../web3/solana/staking/util";
import { d } from "../../../web3/solana/service/d";
import { addDays, format, fromUnixTime } from "date-fns";
import { APY_DECIMALS } from "../../../web3/solana/const";

interface StakesAndRewardsTableProps {
  stakes: Stake[];
  currentPrice: number;
  onStakeNow: () => void;
}

const tableHeaders = [
  "State",
  "Amount",
  "USD Value",
  "Start Date",
  "Locked End Date",
  "APY",
  "Staking Status",
  "Rewards",
  "Action",
];

const StakesAndRewardsTable: FC<StakesAndRewardsTableProps> = ({
  stakes,
  onStakeNow,
  currentPrice,
}) => {
  const renderHeader = () => (
    <Thead>
      <Tr className="py-6">
        {tableHeaders.map((header) => (
          <Th key={header}>{header}</Th>
        ))}
      </Tr>
    </Thead>
  );

  const renderStakeRow = (stake: Stake, index: number) => {
    const date = fromUnixTime(stake.startTime.toNumber());
    const lockEndDate = addDays(date, stake.nftLockDays || 0);
    const dApy = stake.baseApy + (stake.nftApy || 0);
    const apy = dApy / 10 ** APY_DECIMALS;
    const status = stake.restakeTime
      ? "Restaked"
      : stake.destakeTime
        ? "Destaked"
        : "Confirmed";

    const claimableReward = calculateClaimableReward(stake);
    const actualReward = Math.max(
      claimableReward - stake.paidAmount.toNumber(),
      0,
    );

    return (
      <Tr key={index}>
        <Td>{index}</Td>
        <Td>{formatReFi(stake.amount.toNumber())}</Td>
        <Td>{d(stake.amount.toNumber()) * currentPrice}</Td>
        <Td>{format(date, "MMM dd")}</Td>
        <Td>{format(lockEndDate, "MMM dd")}</Td>
        <Td>{`${apy}%`}</Td>
        <Td>{status}</Td>
        <Td>{formatReFi(actualReward)}</Td>
        <Td>
          <div className="flex flex-col gap-2">
            <Button variant="solid" size="sm" colorScheme="green">
              Claim
            </Button>
            <Button variant="outline" size="sm" colorScheme="red">
              Destake
            </Button>
          </div>
        </Td>
      </Tr>
    );
  };

  const renderNoStakesMessage = () => (
    <Tr>
      <Td colSpan={9} textAlign="center" padding="60px">
        <div className="m-auto flex flex-col items-center">
          <Image
            src="/icons/no-transactions-icon.svg"
            alt="No transaction"
            boxSize="120px"
          />
          <p className="mt-4 text-lg font-medium">You have no staked $REFI</p>
          <Button
            variant="brand"
            onClick={onStakeNow}
            borderRadius={"26px"}
            className="text-black mt-6 rounded-[26px] bg-[#25AC88] px-6 py-2 text-[14px] font-semibold"
          >
            Stake Now
          </Button>
        </div>
      </Td>
    </Tr>
  );

  return (
    <div>
      <h3 className="mb-4 font-sans text-xl font-semibold text-white">
        My Stakes & Rewards
      </h3>
      <Table
        variant="unstyled"
        className="w-full rounded-[20px] bg-[#061A11] text-center text-sm font-semibold text-white"
      >
        {renderHeader()}
        <Tbody>
          <Tr>
            <Td colSpan={9} padding="0">
              <Box
                as="hr"
                borderColor="#3C3B3B"
                borderWidth="1px"
                width="100%"
              />
            </Td>
          </Tr>
          {stakes.length > 0
            ? stakes.map(renderStakeRow)
            : renderNoStakesMessage()}
        </Tbody>
      </Table>
    </div>
  );
};

export default StakesAndRewardsTable;
