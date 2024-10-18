import { FC } from "react";
import MarketplaceContent from "../marketplace";
import DashboardContent from "../dashboard";
import StakingContent from "../staking";
import BridgingContent from "../bridging";
import LeaderboardContent from "../leaderboard";
import AdminContent from "../admin";

interface PageContentProps {
  activeTab: string;
}

const PageContent: FC<PageContentProps> = ({ activeTab }) => {
  const contentMap: { [key: string]: JSX.Element } = {
    marketplace: <MarketplaceContent />,
    dashboard: <DashboardContent />,
    staking: <StakingContent />,
    bridging: <BridgingContent />,
    leaderboard: <LeaderboardContent />,
    admin: <AdminContent />,
  };

  return (
    <div>
      {contentMap[activeTab] || (
        <p className="text-white">Content for {activeTab}</p>
      )}
    </div>
  );
};

export default PageContent;
