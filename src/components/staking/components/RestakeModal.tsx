import { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Image,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

interface RestakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RestakeModal: FC<RestakeModalProps> = ({ isOpen, onClose }) => {
  const handleRestakeClick = () => {
    console.log("Restake now");
    onClose();
  };

  const REFI_AMOUNT = 1000;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.7)" backdropFilter="blur(10px)" />
      <ModalContent className="m-auto w-fit max-w-[300px] justify-center !rounded-[15px] border-[1px] border-[#333333] !bg-[#000000] p-5 !drop-shadow-[0_1px_2px_rgba(255,255,255,0.30)] md:min-w-[700px] md:max-w-fit">
        <ModalHeader className="flex w-full justify-end !pb-4 text-white">
          <Button onClick={onClose} className="!bg-[#25AC88] !p-0">
            <IoClose className="h-5 w-5" />
          </Button>
        </ModalHeader>
        <ModalBody className="z-50">
          <div className="mb-6 flex flex-col gap-7 text-center">
            <div className="m-auto flex flex-col items-center gap-4">
              <Image
                src="/icons/stake-success-icon.svg"
                alt="Stake successful"
                boxSize="52px"
              />
              <p className="text-sm font-semibold text-white">
                Stake successful
              </p>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Get ${REFI_AMOUNT} $REFI upfront if you restake now
            </h3>
          </div>
        </ModalBody>
        <ModalFooter className="!pb-7 !pt-0">
          <div className="m-auto flex w-full justify-center">
            <Button
              variant="brand"
              onClick={() => handleRestakeClick()}
              background={"#25AC88"}
              textColor={"#1A1A1A"}
              _hover={{ background: "#ffffff", color: "#25AC88" }}
              _active={{ background: "#ffffff", color: "#25AC88" }}
              borderRadius={"26px"}
              className="inset-y-0 w-fit rounded-[26px] !px-32 py-2 text-[14px] font-semibold text-[#000000]"
            >
              Restake Now
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestakeModal;
