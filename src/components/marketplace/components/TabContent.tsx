import { FC } from "react";
import PurchaseBlock from "./PurchaseBlock";
import AboutProject from "./AboutProject";
import HighlightsGallery from "./HighlightsGallery";
import MyNFTsGallery from "./MyNFTsGallery";

const TabContent: FC<{ activeTab: string }> = ({ activeTab }) => {
  switch (activeTab) {
    case "NFT Collection":
      return <PurchaseBlock />;
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
