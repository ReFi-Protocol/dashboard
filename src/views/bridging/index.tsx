import { FC } from "react";
import PageContent from "../../components/page-contents/PageContent";

const Bridging: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageContent activeTab={"bridging"} />
    </div>
  );
};

export default Bridging;
