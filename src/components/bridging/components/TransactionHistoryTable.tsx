import { FC } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Image, TableContainer } from "@chakra-ui/react";

interface Transaction {
  date: string;
  refiEth: string;
  refiSol: string;
  gasFee: string;
}

interface TransactionHistoryTableProps {
  transactions: Transaction[];
}

const TransactionHistoryTable: FC<TransactionHistoryTableProps> = ({
  transactions,
}) => {
  return (
    <div className="mt-5 w-full">
      <h4 className="py-[15px] text-base font-semibold text-white">
        Transaction history
      </h4>
      <TableContainer>
        <Table
          variant="unstyled"
          className="w-full rounded-[20px] bg-[#061A11] text-center text-sm font-semibold text-white"
        >
          <Thead>
            <Tr className="py-6">
              <Th>
                <div className="pb-4 pt-6">Date</div>
              </Th>
              <Th>
                <div className="pb-4 pt-6">$REFI Eth</div>
              </Th>
              <Th>
                <div className="pb-4 pt-6">$REFI Sol</div>
              </Th>
              <Th>
                <div className="pb-4 pt-6">Gas Fee in USD</div>
              </Th>
            </Tr>
          </Thead>
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
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <Tr key={index}>
                  <Td>
                    <div className="px-1 py-2.5">{transaction.date}</div>
                  </Td>
                  <Td>
                    <div className="px-1 py-2.5">{transaction.refiEth}</div>
                  </Td>
                  <Td>
                    <div className="py2.5 px-1">{transaction.refiSol}</div>
                  </Td>
                  <Td>
                    <div className="px-1 py-2.5">{transaction.gasFee}</div>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4} textAlign="center" padding="60px">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/icons/no-transactions-icon.svg"
                      alt="No transaction"
                      boxSize="120px"
                    />
                    <p className="mt-4 text-lg font-medium">No transactions</p>
                  </div>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionHistoryTable;
