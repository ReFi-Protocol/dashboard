import { FC } from "react";
import PageContent from "../../components/page-contents/PageContent";

const Leaderboard: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageContent activeTab={"leaderboard"} />
    </div>
  );
};

export default Leaderboard;
