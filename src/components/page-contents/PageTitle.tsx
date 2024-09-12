import { IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { HamburgerIcon } from '@chakra-ui/icons';

interface PageTitleProps {
  title: string;
  onOpenSidenav: () => void;
}

const PageTitle: FC<PageTitleProps> = ({ title, onOpenSidenav }) => {
  return (
    <div className="top-4 flex flex-row flex-wrap items-center justify-between rounded-xl bg-none p-2 backdrop-blur-xl">
      <div className="xl:hidden">
        <IconButton
          aria-label="Menu"
          variant="blackAlpha"
          borderRadius="10px"
          onClick={onOpenSidenav}
          icon={<HamburgerIcon color='white' />}
        />
      </div>
      <h2 className="font-sans text-3xl font-medium text-white">{title}</h2>
    </div>
  );
};

export default PageTitle;
