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
      <ModalContent className="m-auto min-w-fit items-center justify-center !rounded-[40px] !bg-[#061A11] px-7 pb-6 pt-5 !text-white">
        <ModalBody className="z-50">
          <div className="flex  flex-col gap-6 md:flex-row">
            {nftInfo && (
              <>
                <Image
                  src={nftInfo?.image}
                  className="h-[350px] w-[350px] rounded-[30px]"
                  alt="NFT image"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-[18px] font-semibold">{nftInfo?.name}</p>
                  <VStack align="start" spacing={2} className="mt-4 text-base">
                    {nftInfo?.attributes?.map((attribute) => (
                      <Box
                        key={attribute.trait_type}
                        className="flex w-full justify-between"
                      >
                        <span>{attribute.trait_type}</span>
                        <span className="font-medium">{attribute.value}</span>
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
            variant="brand"
            borderRadius="26px"
            className="mt-6 min-w-fit rounded-[26px] bg-[#25AC88] px-6 py-2.5 text-[14px] font-semibold text-[#000000]"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NFTModal;
