import { FC } from "react";
import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Image,
} from "@chakra-ui/react";
import { useCustomToast } from "../../../utils";
import { StakeInfoAccount } from "../../../web3/solana/staking/types";
import { createLeaderboardTable } from "../utils";
import { formatReFi } from "../../../web3/solana/staking/util";

interface LeaderboardTableProps {
  stakeAccounts: StakeInfoAccount[];
  currentPrice: number;
}

const tableHeaders = [
  "Rank",
  "Wallet Address",
  "Staked Amount",
  "Number of PCBN",
];

const LeaderboardTable: FC<LeaderboardTableProps> = ({
  stakeAccounts,
  currentPrice,
}) => {
  const showToast = useCustomToast();
  const tableData = createLeaderboardTable(stakeAccounts, currentPrice);

  const renderHeader = () => (
    <Thead>
      <Tr className="py-6">
        {tableHeaders.map((header) => (
          <Th key={header}>{header}</Th>
        ))}
      </Tr>
    </Thead>
  );

  const renderDataRows = () =>
    tableData.map((row, index) => (
      <Tr key={index}>
        <Td>{index + 1}</Td>
        <Td>{row.walletAddress}</Td>
        <Td>{`${formatReFi(row.totalStaked.toNumber())} ($${formatReFi(row.totalStakedUsd)})`}</Td>
        <Td>{row.distinctNftCount}</Td>
      </Tr>
    ));

  const renderNoDataMessage = () => (
    <Tr>
      <Td colSpan={9} textAlign="center" padding="60px">
        <div className="m-auto flex flex-col items-center">
          <Image
            src="/icons/no-transactions-icon.svg"
            alt="No transaction"
            boxSize="120px"
          />
          <p className="mt-4 text-lg font-medium">
            There is no one on the leaderboard yet!
          </p>
        </div>
      </Td>
    </Tr>
  );

  return (
    <div>
      <h3 className="mb-4 font-sans text-xl font-semibold text-white">
        Leaderboard table
      </h3>
      <TableContainer className="custom-scrollbar">
        <Table
          variant="unstyled"
          className="w-full rounded-[20px] bg-[#061A11] text-center text-sm font-semibold text-white"
        >
          {renderHeader()}
          <Tbody>
            <Tr>
              <Td colSpan={4} padding="0">
                <Box
                  as="hr"
                  borderColor="#3C3B3B"
                  borderWidth="1px"
                  width="100%"
                />
              </Td>
            </Tr>
            {tableData.length > 0 ? renderDataRows() : renderNoDataMessage()}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaderboardTable;
