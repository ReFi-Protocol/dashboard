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

interface StakeData {
  state: number;
  amount: string;
  usdValue: string;
  startDate: string;
  lockedEndDate: string;
  apy: string;
  txStatus: string;
  rewards: string;
}

interface StakesAndRewardsTableProps {
  stakes: StakeData[];
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

  const renderStakeRow = (stake: StakeData, index: number) => (
    <Tr key={index}>
      <Td>{stake.state}</Td>
      <Td>{stake.amount}</Td>
      <Td>{stake.usdValue}</Td>
      <Td>{stake.startDate}</Td>
      <Td>{stake.lockedEndDate}</Td>
      <Td>{stake.apy}</Td>
      <Td>{stake.txStatus}</Td>
      <Td>{stake.rewards}</Td>
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
