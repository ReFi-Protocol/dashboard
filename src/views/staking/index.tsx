import { FC } from "react";
import PageContent from "../../components/page-contents/PageContent";

const StakingContent: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageContent activeTab={"staking"} />
    </div>
  );
};

export default StakingContent;
