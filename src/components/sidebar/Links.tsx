import { ReactNode, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { DashIcon } from "../../components/icons";

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

  const activeRoute = (routeName: string) =>
    location.pathname === routeName || location.pathname.includes(routeName);

  const createLinks = (routes: Route[]) =>
    routes.map((route, index) => {
      const isExternal = route.path.startsWith("http");
      const commonClasses = `my-[3px] flex cursor-pointer items-center ${
        activeRoute(route.path)
          ? "font-medium text-white"
          : "font-medium text-[#9B9B9B]"
      }`;

      const content = (
        <>
          <span>{route.icon ? route.icon : <DashIcon />}</span>
          <p className="leading-1 ml-4 flex">{route.name}</p>
        </>
      );

      return isExternal ? (
        <a
          key={index}
          href={route.path}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mb-5 flex hover:cursor-pointer"
        >
          <li className={commonClasses}>{content}</li>
        </a>
      ) : (
        <Link key={index} to={`${route.layout}${route.path}`}>
          <div className="relative mb-5 flex hover:cursor-pointer">
            <li className={commonClasses}>{content}</li>
            {activeRoute(route.path) && (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-[#25AC88]" />
            )}
          </div>
        </Link>
      );
    });

  return <>{createLinks(routes)}</>;
};

export default Links;
