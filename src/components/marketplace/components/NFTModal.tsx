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
import { IconButton } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  uri: string;
  nftInfo: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string | number }> | null;
  };
}

const NFTModal: FC<NFTModalProps> = ({ isOpen, onClose, nftInfo , uri }) => {
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
                  <div className="flex w-full items-center">
                  <p className="text-[18px] font-semibold">{nftInfo?.name}</p>
                  </div>
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
            variant="solid"
            background={"#25AC88"}
            textColor={"#000000"}
            borderRadius={"26px"}
            _hover={{ background: "#ffffff", color: "#25AC88" }}
            _active={{ background: "#ffffff", color: "#25AC88" }}
            className="mt-6 min-w-fit rounded-[26px] px-6 py-2.5 text-[14px] font-semibold"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NFTModal;
