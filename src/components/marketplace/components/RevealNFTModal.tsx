import { FC } from "react";
import { Modal, ModalOverlay } from "@chakra-ui/react";

interface RevealNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RevealNFTModal: FC<RevealNFTModalProps> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay bg="rgba(0, 0, 0, 0.7)" backdropFilter="blur(10x)" />
  </Modal>
);

export default RevealNFTModal;
