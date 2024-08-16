import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Image,
  Button,
  Box,
  VStack,
} from "@chakra-ui/react";

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  nftInfo: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string | number }> | null;
  };
}

const NFTModal: FC<NFTModalProps> = ({ isOpen, onClose, nftInfo }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.7)" backdropFilter="blur(10x)" />
      <ModalContent className="top-24 m-auto max-w-[402px] items-center justify-center rounded-[40px] bg-[#061A11] py-7 pb-6 pt-5 text-white">
        <ModalBody className="z-50">
          <div className="flex flex-col gap-6">
            {nftInfo && (
              <>
                <Image
                  src={nftInfo?.image}
                  className="h-[350px] w-[350px] rounded-[30px]"
                  alt="First NFT Example"
                />
                <div>
                  <p className="text-[18px] font-semibold">{nftInfo?.name}</p>
                  <VStack
                    align="start"
                    spacing={10}
                    className="mb-6 mt-4 text-[15px]"
                  >
                    {nftInfo?.attributes?.map((attribute) => (
                      <Box
                        key={attribute.trait_type}
                        className="flex w-full justify-between"
                      >
                        <span>{attribute.trait_type}</span>
                        <span>{attribute.value}</span>
                      </Box>
                    ))}
                  </VStack>
                </div>
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            className="min-w-fit rounded-[26px] bg-[#25AC88] px-6 py-2.5 text-[14px] font-semibold text-[#000000]"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NFTModal;
