import { FC } from "react";
import { Input, Button, Box } from "@chakra-ui/react";
import { Table, Thead, Tbody, Image, Tr, Th, Td } from "@chakra-ui/react";

interface Transaction {
  date: string;
  refiEth: string;
  refiSol: string;
  gasFee: string;
}

const transactions: Transaction[] = [
  {
    date: "02/07/2024",
    refiEth: "6426.95 MATIC",
    refiSol: "Market Price",
    gasFee: "$0.40",
  },
  {
    date: "02/07/2024",
    refiEth: "6426.95 MATIC",
    refiSol: "Market Price",
    gasFee: "$0.40",
  },
  {
    date: "02/07/2024",
    refiEth: "6426.95 MATIC",
    refiSol: "Market Price",
    gasFee: "$0.40",
  },
  {
    date: "02/07/2024",
    refiEth: "6426.95 MATIC",
    refiSol: "Market Price",
    gasFee: "$0.40",
  },
];

const BridgingContent: FC = () => {
  return (
    <div className="flex flex-col pt-5 text-white">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="2xl:max-w-3/4 flex flex-1">
          <div className="h-fit w-full rounded-[20px] bg-[#061A11] p-[30px]">
            <div className="mb-8 flex flex-col gap-2.5">
              <h3 className="font-sans text-3xl font-medium text-white">
                Bridge
              </h3>
              <p className="font-sans text-sm font-medium text-white">
                ReFi Protocol offers a secured & unlimited transfer across
                chains for tokens & NFT
              </p>
            </div>
            <div className="mb-8 flex flex-col items-center justify-between gap-5 sm:flex-row">
              <div className="flex flex-col items-center text-center">
                <div className="flex flex-col items-center">
                  <img
                    src={"./icons/eth.svg"}
                    alt="Ethereum"
                    className="h-6 w-6"
                  />
                  <p className="text-[10px] font-medium">Ethereum</p>
                </div>
                <div className="my-2 h-12 border-l border-dashed border-white"></div>
                <div className="flex flex-col items-center">
                  <img
                    src={"./icons/sol.svg"}
                    alt="Solana"
                    className="h-6 w-6"
                  />
                  <p className="text-[10px] font-medium">Solana</p>
                </div>
              </div>
              <div className="flex flex-grow flex-col">
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <Input
                    borderRadius="10px"
                    backgroundColor="transparent"
                    padding="14px 20px 14px 25px"
                    className="w-full flex-grow focus:border-white focus:ring-0"
                    borderColor="#494949"
                    textColor="white"
                  />
                  <Button
                    variant="ghost"
                    className="inset-y-0 min-w-fit flex-grow pl-2.5 pr-2.5 text-[14px] font-semibold text-[#25AC88] lg:mr-12"
                  >
                    Connect ETH wallet
                  </Button>
                </div>
                <img
                  src={"./icons/swap-icon.svg"}
                  alt="Transfer"
                  className="my-2 h-8 w-8 self-center"
                />
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <Input
                    borderRadius="10px"
                    backgroundColor="transparent"
                    padding="14px 20px 14px 25px"
                    borderColor="#494949"
                    textColor="white"
                    className="w-full flex-grow focus:border-white focus:ring-0"
                  />
                  <Button
                    variant="ghost"
                    className="inset-y-0 min-w-fit flex-grow pl-2.5 pr-2.5 text-[14px] font-semibold text-[#25AC88] lg:mr-12"
                  >
                    Connect SOL wallet
                  </Button>
                </div>
              </div>
            </div>
            <Button
              variant="brand"
              className="w-full rounded-[30px] bg-[#07BA9A] p-3 text-center text-base font-semibold text-[#000000]"
            >
              Swap
            </Button>
          </div>
        </div>

        <div className="2xl:max-w-1/4 flex flex-1">
          <div className="h-fit w-full rounded-[20px] bg-[#061A11] p-[15px]">
            <div className="flex flex-col">
              <p>Conversion</p>
              <div className="my-3 w-full border-b border-solid border-[#3C3B3B]"></div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-10 text-nowrap">
                  <span>$REFI (ETH)</span>
                  <span>1253</span>
                </div>
                <div className="flex justify-between">
                  <span>$REFI (SOL)</span>
                  <span>1253</span>
                </div>
                <div className="flex justify-between">
                  <span>Difference</span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full">
        <h4 className="py-[15px] text-base font-semibold text-white">
          Transaction history
        </h4>
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
                    <div className="px-1 py-10">{transaction.date}</div>
                  </Td>
                  <Td>
                    <div className="px-1 py-10">{transaction.refiEth}</div>
                  </Td>
                  <Td>
                    <div className="px-1 py-10">{transaction.refiSol}</div>
                  </Td>
                  <Td>
                    <div className="px-1 py-10">{transaction.gasFee}</div>
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
      </div>
    </div>
  );
};

export default BridgingContent;
