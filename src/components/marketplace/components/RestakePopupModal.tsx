import { FC } from "react";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface RestakePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RestakePopupModal: FC<RestakePopupModalProps> = ({ isOpen, onClose }) => {
  const handleRestake = () => {
      onClose(); 
      window.scrollTo({
          top: 1000, // Scroll to the bottom
          behavior: 'smooth', // Smooth scrolling
      });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.7)" backdropFilter="blur(10px)" />
      <ModalContent className="m-auto min-w-fit items-center justify-center !rounded-[40px] !bg-[#061A11] px-7 pb-6 pt-5 !text-white">
        <ModalBody className="z-50">
          <div className="mb-10 flex flex-col gap-10 text-center">
            <h3 className="text-3xl font-medium text-white">
              Get Your Rewards!
            </h3>
            <div className="">
              <p className="text-xl font-medium text-white">
                Restake for even higher rewards!

                Get 1/3 of $REFI upfront when you restake all your locked tokens now!
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="w-full">
          <div className="flex w-full justify-evenly">
            <Button
              variant="outline"
              size="sm"
              colorScheme="green"
              textColor={"#07BA9A"}
              borderRadius={"8px"}
              onClick={onClose}
            >
              Maybe Later
            </Button>
            <Button
              variant="solid"
              size="sm"
              colorScheme="green"
              background={"#25AC88"}
              textColor={"#1A1A1A"}
              _hover={{ background: "#ffffff", color: "#25AC88" }}
              _active={{ background: "#ffffff", color: "#25AC88" }}
              borderRadius={"8px"}
              onClick={handleRestake}
            >
              Restake now
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestakePopupModal;