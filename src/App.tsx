import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Services from "@/pages/Services";
import Service from "@/pages/Service";
import Industries from "@/pages/Industries";
import Industry from "@/pages/Industry";
import Locations from "@/pages/Locations";
import Location from "@/pages/Location";
import StateLocation from "@/pages/StateLocation";
import LocalService from "@/pages/LocalService";
import AIServices from "@/pages/AIServices";
import Admin from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import Sitemap from "@/pages/Sitemap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/services/:service",
    element: <Service />,
  },
  {
    path: "/services/:service/:state/:city",
    element: <LocalService />,
  },
  {
    path: "/industries",
    element: <Industries />,
  },
  {
    path: "/industries/:industry",
    element: <Industry />,
  },
  {
    path: "/locations",
    element: <Locations />,
  },
  {
    path: "/locations/:state",
    element: <StateLocation />,
  },
  {
    path: "/locations/:state/:city",
    element: <Location />,
  },
  {
    path: "/ai-services",
    element: <AIServices />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/sitemap",
    element: <Sitemap />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;