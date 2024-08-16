import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Image,
} from "@chakra-ui/react";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectWalletModal: FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.7)" backdropFilter="blur(10x)" />
      <ModalContent className="m-auto min-w-fit items-center justify-center !rounded-[40px] !bg-[#061A11] px-7 pb-12 pt-7 !text-white">
        <ModalBody className="z-50">
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="m-auto rounded-full bg-[#092518] p-8">
              <Image
                src="../icons/connect-wallet-icon.svg"
                className=" h-20 w-20"
                alt="connect wallet icon"
              />
            </div>
            <p className="text-xl font-medium text-white">
              Please connect your wallet in order to continue
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-center pt-5">
            <UnifiedWalletButton
              buttonClassName="wallet-button"
              overrideContent="Connect SOL WALLET"
            />
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectWalletModal;
