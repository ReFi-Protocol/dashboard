import { FC } from "react";
import PageContent from "../../components/page-contents/PageContent";

const Staking: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageContent activeTab={"staking"} />
    </div>
  );
};

export default Staking;
