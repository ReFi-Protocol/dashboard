import { FC, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import routes from "../routes";
import PageTitle from "../components/page-contents/PageTitle";
import { AppRoute } from "../types";

const Layout: FC = () => {
  const [currentRoute, setCurrentRoute] = useState("Dashboard");
  const [open, setOpen] = useState(true);

  const location = useLocation();

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true),
    );
  }, []);

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
    return routes.map((prop, key) => {
      return <Route path={prop.path} element={prop.component} key={key} />;
    });
  };

  return (
    <div className="flex h-full w-full bg-[#000000] px-4 pb-36 pt-5">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-[#000000] ">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[250px] ">
          <PageTitle title={currentRoute} onOpenSidenav={() => setOpen(true)} />
          <div className="mx-auto mb-auto h-full min-h-[84vh] p-2 pt-5">
            <Routes>
              {getRoutes(routes)}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
