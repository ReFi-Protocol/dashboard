import { FC } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Image,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { Operation } from "../../../web3/bridge/types";
import { format } from "date-fns";

interface TransactionHistoryTableProps {
  operations: Operation[];
  onRedeemClick: (operation: Operation) => void;
}

const TransactionHistoryTable: FC<TransactionHistoryTableProps> = ({
  operations,
  onRedeemClick,
}) => {
  return (
    <div className="mt-5 w-full">
      <h4 className="py-[15px] text-base font-semibold text-white">
        Transaction history
      </h4>
      <TableContainer className="custom-scrollbar">
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
                <div className="pb-4 pt-6">Amount</div>
              </Th>
              <Th>
                <div className="pb-4 pt-6">Source</div>
              </Th>
              <Th>
                <div className="pb-4 pt-6">Destination</div>
              </Th>
              <Th>
                <div className="pb-4 pt-6">Fee</div>
              </Th>
              <Th>
                <div className="pb-4 pt-6">Status</div>
              </Th>
              <Th>
                <div className="pb-4 pt-6">Action</div>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={7} padding="0">
                <Box
                  as="hr"
                  borderColor="#3C3B3B"
                  borderWidth="1px"
                  width="100%"
                />
              </Td>
            </Tr>
            {operations.length > 0 ? (
              operations.map((operation, index) => (
                <Tr key={index}>
                  <Td>
                    <div className="px-1 py-2.5">
                      {format(operation.timestamp, "MMM dd")}
                    </div>
                  </Td>
                  <Td>
                    <div className="px-1 py-2.5">{operation.amount}</div>
                  </Td>
                  <Td>
                    <div className="py2.5 px-1">{operation.sourceChain}</div>
                  </Td>
                  <Td>
                    <div className="py2.5 px-1">{operation.destChain}</div>
                  </Td>
                  <Td>
                    <div className="px-1 py-2.5">
                      {parseFloat(operation.fee).toFixed(6)}
                    </div>
                  </Td>
                  <Td>
                    <div className="px-1 py-2.5">{operation.status}</div>
                  </Td>
                  <Td>
                    {operation.status === "VAA EMITTED" && (
                      <div className="px-1 py-2.5">
                        <Button
                          variant="outline"
                          size="sm"
                          colorScheme="green"
                          textColor={"#07BA9A"}
                          borderRadius={"8px"}
                          onClick={() => onRedeemClick(operation)}
                        >
                          Redeem
                        </Button>
                      </div>
                    )}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={7} textAlign="center" padding="60px">
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
