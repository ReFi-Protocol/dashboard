import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface RevealNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRevealed: boolean;
}

const RevealNFTModal: FC<RevealNFTModalProps> = ({
  isOpen,
  onClose,
  isRevealed,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isCentered
    closeOnOverlayClick={false}
  >
    <ModalOverlay bg="rgba(0, 0, 0, 0.7)" backdropFilter="blur(10x)" />
    <ModalContent className="m-auto min-w-fit items-center justify-center !rounded-[40px] !bg-[#061A11] px-7 pb-6 pt-5 !text-white">
      <ModalBody className="z-50">
        <div className="animate-gradient h-[350px] w-[350px] rounded-[30px] bg-gradient-to-tr from-[#061A11] via-[#0A4A33] to-[#565D5A]"></div>
      </ModalBody>
      <ModalFooter>
        <Button
          className={`!px-12 !py-4 !text-[17px] !font-medium ${
            !isRevealed ? "cursor-not-allowed opacity-50" : ""
          }`}
          variant="solid"
          size="sm"
          colorScheme="green"
          background={"#25AC88"}
          textColor={"#1A1A1A"}
          disabled={!isRevealed}
          _hover={{
            background: isRevealed ? "#25AC88" : "#ffffff",
            color: isRevealed ? "#1A1A1A" : "#25AC88",
          }}
          _active={{
            background: isRevealed ? "#ffffff" : "#2D6A4F",
            color: isRevealed ? "#25AC88" : "#8C8C8C",
          }}
          borderRadius={"26px"}
          onClick={isRevealed ? onClose : undefined}
        >
          {isRevealed ? "Reveal NFT" : "Revealing NFT..."}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default RevealNFTModal; 
