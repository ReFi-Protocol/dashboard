import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Image,
  Button,
} from "@chakra-ui/react";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialModal: FC<TutorialModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={true}
      isCentered
    >
      <ModalOverlay bg="rgba(0, 0, 0, 0.7)" backdropFilter="blur(10x)" />
      <ModalContent className="m-auto min-w-fit items-center justify-center !rounded-[40px] !bg-[#061A11] px-7 pt-7 !text-white">
        <ModalBody className="z-50">
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="text-2xl font-bold">Tutorial is comming soon...</h1>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="brand"
            onClick={onClose}
          >
            Got it!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TutorialModal;
