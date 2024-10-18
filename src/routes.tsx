import Marketplace from "./views/marketplace";
import Admin from "./views/admin";
import Dashboard from "./views/dashboard";
import Staking from "./views/staking";
import Bridging from "./views/bridging";
import Leaderboard from "./views/leaderboard";
import {
  MdOutlineShoppingCart,
  MdHome,
  MdBarChart,
  MdTrendingUp,
  MdSwapHoriz,
} from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AppRoute } from "./types";
import { env } from "./env";
import { RiAdminFill } from "react-icons/ri";

const devRoutes: AppRoute[] = [
  {
    name: "Dashboard",
    layout: "/",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "Marketplace",
    layout: "/",
    path: "marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Marketplace />,
    secondary: true,
  },
  {
    name: "Staking",
    layout: "/",
    path: "staking",
    icon: <MdTrendingUp className="h-6 w-6" />,
    component: <Staking />,
  },
  // {
  //   name: "Bridging",
  //   layout: "/",
  //   path: "bridging",
  //   icon: <MdSwapHoriz className="h-6 w-6" />,
  //   component: <Bridging />,
  // },
  {
    name: "Leaderboard",
    layout: "/",
    path: "leaderboard",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Leaderboard />,
  },
  {
    name: "Contact us",
    layout: "",
    path: "https://refiprotocol.io/contact",
    icon: <FaExternalLinkAlt />,
    component: "",
  },
];

const prodRoutes: AppRoute[] = [
  // {
  //   name: "Dashboard",
  //   layout: "/",
  //   path: "dashboard",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <Dashboard />,
  // },
  {
    name: "Marketplace",
    layout: "/",
    path: "marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Marketplace />,
    secondary: true,
  },
  // {
  //   name: "Staking",
  //   layout: "/",
  //   path: "staking",
  //   icon: <MdTrendingUp className="h-6 w-6" />,
  //   component: <Staking />,
  // },
  {
    name: "Bridging",
    layout: "/",
    path: "bridging",
    icon: <MdSwapHoriz className="h-6 w-6" />,
    component: <Bridging />,
  },
  // {
  //   name: "Leaderboard",
  //   layout: "/",
  //   path: "leaderboard",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   component: <Leaderboard />,
  // },
  {
    name: "Contact us",
    layout: "",
    path: "https://refiprotocol.io/contact",
    icon: <FaExternalLinkAlt />,
    component: "",
  },
  {
    name: "Admin",
    layout: "/",
    path: "admin",
    isAdmin: true,
    icon: <RiAdminFill className="h-6 w-6" />,
    component: <Admin />,
  },
];

const routes: AppRoute[] =
  env.REACT_APP_ENVIRONMENT === "development" ? devRoutes : prodRoutes;

export default routes;
