import { InfoOutlineIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NotFound from "../components/not-found";
import PageTitle from "../components/page-contents/PageTitle";
import Sidebar from "../components/sidebar";
import TutorialModal from "../components/tutorial-modal";
import routes from "../routes";
import { AppRoute } from "../types";
import { getConfig } from "../web3/solana/staking/service/getConfig";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { ProgramConfig } from "../web3/solana/staking/types";

const Layout: FC = () => {
  const [currentRoute, setCurrentRoute] = useState("Dashboard");
  const [open, setOpen] = useState(true);
  const [openTutorial, setOpenTutorial] = useState<boolean>(false);
  const anchorWallet = useAnchorWallet();
  const [config, setConfig] = useState<ProgramConfig | null>(null);

  const location = useLocation();

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true),
    );
  }, []);
  useEffect(() => {

    if (anchorWallet) {
        getConfig(anchorWallet).then((config) =>{
          setConfig(config)
      })
    }
  }, [anchorWallet?.publicKey]);

  useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes: AppRoute[]) => {
    const activeRoute = "Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };

  const getRoutes = (routes: AppRoute[]) => {
    return routes.filter((route) =>{
      return !route.isAdmin || config && anchorWallet && config.admin.equals(anchorWallet?.publicKey)
    }).map((prop, key) => {
      return <Route path={prop.path} element={prop.component} key={key} />;
    });
  };

  return (
    <div className="flex h-full w-full bg-[#000000] px-4 pb-36 pt-5">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-[#000000] ">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[250px] ">
          <div className="flex w-full items-center">
            <PageTitle title={currentRoute} onOpenSidenav={() => setOpen(true)} />
            <IconButton
              aria-label="Info"
              variant="blackAlpha"
              borderRadius="10px"
              onClick={() => setOpenTutorial(true)}
              icon={<InfoOutlineIcon color='white' />}
            />
          </div>
          <div className="mx-auto mb-auto h-full min-h-[84vh] p-2 pt-5">
            <Routes>
              {getRoutes(routes)}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <TutorialModal
          isOpen={openTutorial}
          onClose={() => setOpenTutorial(false)}
        />
      </div>
    </div>
  );
};

export default Layout;
