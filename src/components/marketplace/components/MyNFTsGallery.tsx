import { FC, useState } from "react";
import NFTCard from "./NFTCard";
import { Button, Image } from "@chakra-ui/react";
import NFTModal from "./NFTModal";

const MyNFTsGallery: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const candyMachine = useCandyMachine();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return candyMachine ? (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {candyMachine.items.splice(0, 12).map((item) => (
          <NFTCard
            name={"pCRBN #1"}
            key={1}
            uri={"./images/5.webp"}
            onClick={openModal}
          />
        ))}
      </div>
      <NFTModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  ) : (
    <div>loading...</div>
  );
};

export default MyNFTsGallery;
