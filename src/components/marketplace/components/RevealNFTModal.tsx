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


interface ZeroReFiTokensPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  zeroRefiTokens: boolean;
}

export const ZeroReFiTokensPopupModal: FC<ZeroReFiTokensPopupModalProps> = ({
  isOpen,
  onClose,
  zeroRefiTokens,
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
             ""
          }`}
          variant="solid"
          size="sm"
          colorScheme="green"
          background={"#25AC88"}
          textColor={"#1A1A1A"}
          disabled={!zeroRefiTokens}
          _hover={{
            background: zeroRefiTokens ? "#25AC88" : "#ffffff",
            color: zeroRefiTokens ? "#1A1A1A" : "#25AC88",
          }}
          _active={{
            background: zeroRefiTokens ? "#ffffff" : "#2D6A4F",
            color: zeroRefiTokens ? "#25AC88" : "#8C8C8C",
          }}
          borderRadius={"26px"}
          onClick={onClose}
        >
          {zeroRefiTokens ? "We see that you are connected with 0 refi tokens, buy now for access to rewards!" : "Purchase your pCRBN NFT and own a plot of a French forest! You can be eligible to earn rewards (e.g. 110% APY)!"}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

interface RestakePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RestakePopupModal: FC<RestakePopupModalProps> = ({
  isOpen,
  onClose,
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
             ""
          }`}
          variant="solid"
          size="sm"
          colorScheme="green"
          background={"#25AC88"}
          textColor={"#1A1A1A"}
          disabled={false}
          _hover={{
            background: "#25AC88",
            color: "#1A1A1A",
          }}
          _active={{
            background: "#ffffff",
            color: "#25AC88",
          }}
          borderRadius={"26px"}
          onClick={onClose}
        >
          {"Restake for Even Higher Rewards!"}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default RevealNFTModal; 
