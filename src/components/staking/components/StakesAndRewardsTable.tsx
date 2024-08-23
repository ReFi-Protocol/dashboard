import { FC } from "react";
import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
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
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useCustomToast } from "../../../utils";
import { claim } from "../../../web3/solana/staking/service/claim";
import { destake } from "../../../web3/solana/staking/service/destake";
import { restake } from "../../../web3/solana/staking/service/restake";

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
  const anchorWallet = useAnchorWallet();
  const walletContext = useWallet();
  const showToast = useCustomToast();

  const handleClaimClick = async (stakeIndex: number) => {
    if (anchorWallet) {
      try {
        await claim(walletContext, anchorWallet, stakeIndex);
      } catch (e: any) {
        showToast({
          title: "Error",
          description: e.message,
          status: "error",
        });

        console.error(e);
      }
    }
  };

  const handleRestakeClick = async (stakeIndex: number) => {
    if (anchorWallet) {
      try {
        await restake(walletContext, anchorWallet, stakeIndex);
      } catch (e: any) {
        showToast({
          title: "Error",
          description: e.message,
          status: "error",
        });

        console.error(e);
      }
    }
  };

  const handleDestakeClick = async (stakeIndex: number) => {
    if (anchorWallet) {
      try {
        await destake(walletContext, anchorWallet, stakeIndex);
      } catch (e: any) {
        showToast({
          title: "Error",
          description: e.message,
          status: "error",
        });

        console.error(e);
      }
    }
  };

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
        <Td>
          <Badge
            colorScheme="green"
            variant="subtle"
            className="!rounded-lg !bg-[#0A2C1D] !px-[6px] !py-[5px] uppercase !text-[#07BA9A]"
          >
            {status}
          </Badge>
        </Td>
        <Td>{formatReFi(actualReward)}</Td>
        <Td>
          <div className="flex flex-col gap-2">
            <Button
              variant="solid"
              size="sm"
              colorScheme="green"
              background={"#25AC88"}
              textColor={"#1A1A1A"}
              _hover={{ background: "#ffffff", color: "#25AC88" }}
              _active={{ background: "#ffffff", color: "#25AC88" }}
              borderRadius={"8px"}
              onClick={() => handleRestakeClick(index)}
            >
              Restake
            </Button>
            <Button
              variant="outline"
              size="sm"
              colorScheme="green"
              textColor={"#07BA9A"}
              borderRadius={"8px"}
              onClick={() => handleClaimClick(index)}
            >
              Claim
            </Button>
            <Button
              variant="solid"
              size="sm"
              colorScheme="red"
              background={"#DB3545"}
              textColor={"#ffffff"}
              _hover={{ background: "#ffffff", color: "#DB3545" }}
              _active={{ background: "#ffffff", color: "#DB3545" }}
              borderRadius={"8px"}
              onClick={() => handleDestakeClick(index)}
            >
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
            className="mt-6 rounded-[26px] bg-[#25AC88] px-6 py-2 text-[14px] font-semibold text-[#000000]"
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
      <TableContainer>
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
      </TableContainer>
    </div>
  );
};

export default StakesAndRewardsTable;
