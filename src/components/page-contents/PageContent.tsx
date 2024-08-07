import { FC } from "react";
import MarketplaceContent from "../marketplace";
import DashboardContent from "../dashboard";

interface PageContentProps {
  activeTab: string;
}

const PageContent: FC<PageContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "marketplace":
        return <MarketplaceContent />;
      case "dashboard":
        return <DashboardContent />;
      default:
        return <p className="text-white">Content for {activeTab}</p>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default PageContent;
