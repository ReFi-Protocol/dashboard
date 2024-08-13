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

const nftDetails = [
  { label: "Latitude", value: "46.1268" },
  { label: "Longitude", value: "0.98031" },
  { label: "Ownership Size", value: "20 sq. m." },
  { label: "Tree Species", value: "Sessile" },
  { label: "Forest", value: "Peyrat de Bellac forest" },
  { label: "Plantation date", value: "2024-12-01" },
  { label: "Ownership until", value: "2024-11-12" },
];

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NFTModal: FC<NFTModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal onClose={onClose} size={"sm"} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="max-w-[402px] items-center justify-center rounded-[40px] bg-[#061A11] py-7 pb-6 pt-5 text-white">
        <ModalBody>
          <div className="flex flex-col gap-6">
            <Image
              src="./images/1.webp"
              className="h-[350px] w-[350px] rounded-[30px]"
              alt="First NFT Example"
            />
            <div>
              <p className="text-[18px] font-semibold">About NFT</p>
              <VStack
                align="start"
                spacing={10}
                className="mb-6 mt-4 text-[15px]"
              >
                {nftDetails.map((detail) => (
                  <Box
                    key={detail.label}
                    className="flex w-full justify-between"
                  >
                    <span>{detail.label}</span>
                    <span>{detail.value}</span>
                  </Box>
                ))}
              </VStack>
            </div>
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
