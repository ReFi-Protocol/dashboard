import { FC } from "react";
import NFTCollectionGallery from "./NFTCollectionGallery";
import AboutProject from "./AboutProject";
import HighlightsGallery from "./HighlightsGallery";
import MyNFTsGallery from "./MyNFTsGallery";

const TabContent: FC<{ activeTab: string }> = ({ activeTab }) => {
  switch (activeTab) {
    case "NFT Collection":
      return <NFTCollectionGallery />;
    case "About the project":
      return <AboutProject />;
    case "Highlights":
      return <HighlightsGallery />;
    case "My NFTs":
      return <MyNFTsGallery />;
    default:
      return null;
  }
};

export default TabContent;
