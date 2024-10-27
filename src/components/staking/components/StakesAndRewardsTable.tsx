import { FC , useState} from "react";
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
import {
  addDays,
  format,
  fromUnixTime,
  compareAsc,
  compareDesc,
} from "date-fns";
import { APY_DECIMALS } from "../../../web3/solana/const";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useCustomToast } from "../../../utils";
import { claim } from "../../../web3/solana/staking/service/claim";
import { destake } from "../../../web3/solana/staking/service/destake";
import { restake } from "../../../web3/solana/staking/service/restake";
import { d } from "../../../web3/util/d";
import { GaEvent, registerEvent } from "../../../events";

interface StakesAndRewardsTableProps {
  stakes: Stake[];
  currentPrice: number;
  onStakeNow: () => void;
  setClaimedRewards: (reward: number) => void;
}

const tableHeaders = [
  "State",
  "Amount",
  "USD Value",
  "Start Date",
  "LOCK END DATE",
  "APY",
  "Staking Status",
  "Unclaimed Rewards",
  "Action",
];

const StakesAndRewardsTable: FC<StakesAndRewardsTableProps> = ({
  stakes,
  onStakeNow,
  currentPrice,
  setClaimedRewards
}) => {
  const anchorWallet = useAnchorWallet();
  const walletContext = useWallet();
  const showToast = useCustomToast();

  const [rewards, setRewards] = useState(
    stakes.map((stake) => {
      const claimableReward = calculateClaimableReward(stake);
      return Math.max(claimableReward - stake.paidAmount.toNumber(), 0);
    })
  );

  const handleRestakeClick = async (stakeIndex: number) => {
    registerEvent({ event: GaEvent.RESTAKE });
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
    registerEvent({ event: GaEvent.DESTAKE });
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

  const handleClaimClick = async (stakeIndex: number) => {
    registerEvent({ event: GaEvent.CLAIM });
    if (anchorWallet) {
      try {
         await claim(walletContext, anchorWallet, stakeIndex);

        const claimedReward = rewards[stakeIndex];
        setClaimedRewards(claimedReward);

        setRewards((prevRewards) =>
          prevRewards.map((reward, index) =>
            index === stakeIndex ? 0 : reward
          )
        );
      } catch (e: any) {
        showToast({
          title: "Error",
          description: e.message,
          status: "error",
        });

        console.error(e);
      }
    }
    window.location.reload();
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
    const startDate = fromUnixTime(stake.startTime.toNumber());
    const lockEndDate = addDays(startDate, stake.nftLockDays || 0);
    const dApy = stake.baseApy + (stake.nftApy || 0);
    const apy = dApy / 10 ** APY_DECIMALS;
     const status = stake.restakeTime
       ? "Confirmed Restake"
       : stake.destakeTime
         ? "Destaked"
         : "Confirmed Stake";
    const canDestake = compareDesc(lockEndDate, new Date()) > 0;
    const canRestake = !stake.parentStakeIndex && stake.nft;

    return (
      <Tr key={index}>
        <Td>{index}</Td>
        <Td>{formatReFi(stake.amount.toNumber())}</Td>
        <Td>{formatReFi(stake.amount.toNumber() * currentPrice)}</Td>
        <Td>{format(startDate, "MMM dd")}</Td>
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
        <Td>{formatReFi(rewards[index])}</Td>
        <Td>
          <div className="flex min-h-[112px] flex-col justify-center gap-2">
            {!stake.destakeTime && (
              <>
                {canRestake && (
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
                )}
                {rewards[index] > 0 && (
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
                )}
                {canDestake && (
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
                )}
              </>
            )}
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
      <TableContainer className="custom-scrollbar">
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
