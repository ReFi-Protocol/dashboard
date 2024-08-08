import { ReactNode, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "../../components/icons/DashIcon";

interface Route {
  layout: string;
  path: string;
  name: string;
  icon?: ReactNode;
}

interface LinksProps {
  routes: Route[];
}

const Links: FC<LinksProps> = ({ routes }) => {
  const location = useLocation();

  const activeRoute = (routeName: string) => {
    return (
      location.pathname === routeName || location.pathname.includes(routeName)
    );
  };

  const createLinks = (routes: Route[]) => {
    return routes.map((route, index) => (
      <Link key={index} to={`${route.layout}${route.path}`}>
        <div className="relative mb-3 flex hover:cursor-pointer">
          <li className="my-[3px] flex cursor-pointer items-center">
            <span
              className={`${
                activeRoute(route.path)
                  ? "font-medium text-white"
                  : "font-medium text-[#9B9B9B]"
              }`}
            >
              {route.icon ? route.icon : <DashIcon />}
            </span>
            <p
              className={`leading-1 ml-4 flex ${
                activeRoute(route.path)
                  ? "font-medium text-white"
                  : "font-medium text-[#9B9B9B]"
              }`}
            >
              {route.name}
            </p>
          </li>
          {activeRoute(route.path) && (
            <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-[#25AC88]" />
          )}
        </div>
      </Link>
    ));
  };

  return <>{createLinks(routes)}</>;
};

export default Links;
