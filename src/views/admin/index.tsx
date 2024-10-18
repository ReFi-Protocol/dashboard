import { FC } from "react";
import PageContent from "../../components/page-contents/PageContent";

const Admin: FC = () => {
  return (
    <div className="flex flex-col gap-8 pt-1">
      <PageContent activeTab={"admin"} />
    </div>
  );
};

export default Admin;
