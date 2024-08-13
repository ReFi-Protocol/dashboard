import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  Button,
} from "@chakra-ui/react";

const StakingPoolOptionsModal = ({ isOpen, onClose }) => {
  return (
    <Modal onClose={onClose} size={"sm"} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="max-w-[698px] items-center justify-center rounded-[40px] border-[1px] border-[#333333] bg-[#000000] p-5 text-white">
        <ModalHeader className="flex  w-full justify-between">
          <p>Select Staking Option</p>
          <Button
            onClick={onClose}
            className="bg-[ h-[18px] w-[18px]"
            style={{
              width: "18px",
              height: "18px",
              backgroundImage: "url('./icons/close-icon.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Button>
        </ModalHeader>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StakingPoolOptionsModal;
