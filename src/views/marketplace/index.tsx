import { FC } from "react";
import PageContent from "../../components/page-contents/PageContent";

const Marketplace: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageContent activeTab={"marketplace"} />
    </div>
  );
};

export default Marketplace;
