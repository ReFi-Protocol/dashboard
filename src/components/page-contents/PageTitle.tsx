import { FC } from "react";
import { FiAlignJustify } from "react-icons/fi";

interface PageTitleProps {
  title: string;
  onOpenSidenav: () => void;
}

const PageTitle: FC<PageTitleProps> = ({ title, onOpenSidenav }) => {
  return (
    <div className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-none p-2 backdrop-blur-xl">
      <h2 className="font-sans text-3xl font-medium text-white">{title}</h2>
      <span
        className="flex cursor-pointer text-xl text-white xl:hidden"
        onClick={onOpenSidenav}
      >
        <FiAlignJustify className="h-5 w-5" />
      </span>
    </div>
  );
};

export default PageTitle;
