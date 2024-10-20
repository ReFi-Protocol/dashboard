import { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

interface ZeroReFiTokensPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  zeroRefiTokens: boolean;
}

const ZeroReFiTokensPopupModal: FC<ZeroReFiTokensPopupModalProps> = ({ isOpen, onClose, zeroRefiTokens, }) => {
  const navigate = useNavigate();

  const handleClick = () => {

    navigate("/marketplace")

    window.scrollTo({
        top: 2000, 
        behavior: 'smooth' 
    });
    onClose(); 
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.7)" backdropFilter="blur(10px)" />
      <ModalContent className="m-auto min-w-fit items-center justify-center !rounded-[40px] !bg-[#061A11] px-7 pb-6 pt-5 !text-white">
        <ModalBody className="z-50">
          <div className="mb-10 flex flex-col gap-10 text-center">
            <h3 className="text-3xl font-medium text-white">
              {zeroRefiTokens ? "Get Your Rewards!" : "Own a Forest!"}
            </h3>
            <div className="">
              <p className="text-xl font-medium text-white">
              {zeroRefiTokens ? "We see that you are connected with 0 refi tokens, buy now for access to rewards!" : "Purchase your pCRBN NFT and own a plot of a French forest! You can be eligible to earn rewards (e.g. 110% APY)!"}
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="w-full">
        
          {zeroRefiTokens && (
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
            <a href = "https://app.uniswap.org/explore/tokens/ethereum/0xa4bb712b4ea05e74a9590ec550bd922cd857afcb" target="_blank" rel="noopener noreferrer">
              
            <Button
                variant="solid"
                size="sm"
                colorScheme="green"
                background={"#25AC88"}
                textColor={"#1A1A1A"}
                _hover={{ background: "#ffffff", color: "#25AC88" }}
                _active={{ background: "#ffffff", color: "#25AC88" }}
                borderRadius={"8px"}
                >
                Buy now
                </Button>

            </a>
          </div>
          )}

          {!zeroRefiTokens && (
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
                onClick={handleClick}
                >
                Explore now
                </Button>
            </div>
          )}

        </ModalFooter>
      </ModalContent>
    </Modal>


  );
};

export default ZeroReFiTokensPopupModal;