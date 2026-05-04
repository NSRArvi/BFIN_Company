import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact";
import About from "../pages/About/About";
import Career from "../pages/Career";
import ComingSoon from "../components/ComingSoon";
import Notfound from "../components/Notfound";
import Products from "../components/Products";
import Blogs from "../pages/Blog/Blogs";
import WhiteLabel from "../pages/WhiteLabel";
import SpecialSoftware from "../pages/SpecialSoftware";
import ECommerceDetails from "../pages/ECommerceDetails/ECommerceDetails";
import Reseller from "../pages/Reseller/Reseller";
import EcommerceGuide from "../pages/EcommerceGuide/EcommerceGuide";
import OurBrands from "../pages/OurBrands/OurBrands";
import BlogDetails from "../pages/Blog/BlogDetails";
import HostingProducts from "../pages/Hosting/HostingProducts";
import DataCenter from "../pages/DataCenter/DataCenter";
import NewWhiteLabel from "../pages/NewWhiteLabel/NewWhiteLabel";
import WhiteLabelCheckout from "../pages/WhiteLabelCheckout/WhiteLabelCheckout";
import SassSoftware from "../pages/SassSoftware/SassSoftware";
import Invoice from "../pages/Invoice/Invoice";
import CookiePolicy from "../pages/CookiePolicy/CookiePolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import CustomVps from "../pages/Hosting/CustomVps/CustomVps";
import ServerHomePage from "../pages/ServerHomePage/HomePage";
import VpsHosting from "../pages/VpsHosting/VpsHosting";
import WebHosting from "../pages/WebHosting/WebHosting";
import DedicatedServer from "../pages/DedicatedServer/DedicatedServer";
import NewDataCenter from "../pages/NewDataCenter/NewDataCenter";
import OurTechnologies from "../pages/OurTechnologies/OurTechnologies";
import DistributeAffiliate from "../pages/DistributeAffiliate/DistributeAffiliate";
import HostingPackages from "../pages/Hosting/HostingPackages";
import StarterWebPack from "../pages/StarterWebPack/StarterWebPack";
import Hardwares from "../pages/Hardwares/Hardwares";
import Home3 from "../pages/Home3/Home3";
import EcomEnterprisePack from "../pages/EcomEnterprisePack/EcomEnterprisePack";
import ScottyPumpkinPage from "../pages/Home3/Scottypumpkin/Scottypumpkinpage";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home3 />,
      },
      {
        path: "/hosting",
        element: <ServerHomePage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/our-brands",
        element: <OurBrands />,
      },
      {
        path: "/career",
        element: <Career />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blog/:slug",
        element: <BlogDetails />,
      },
      {
        path: "/our-products",
        element: <Products />,
      },
      // old design hosting pricing page
      {
        path: "/hosting-products/:id",
        element: <HostingProducts />,
      },
      {
        path: "/build-your-own-vps",
        element: <CustomVps />,
      },
      {
        path: "/old-white-label",
        element: <WhiteLabel />,
      },
      {
        path: "/white-label",
        element: <NewWhiteLabel />,
      },
      {
        path: "/checkout/:type/:id",
        element: <WhiteLabelCheckout />,
      },
      {
        path: "/old-software",
        element: <SpecialSoftware />,
      },
      {
        path: "/sass-software",
        element: <SassSoftware />,
      },
      {
        path: "/bfinit-ecomerce-platform",
        element: <ECommerceDetails />,
      },
      {
        path: "/checkout/packages/:id/:duration",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/ecommerce-enterprise-pack",
        element: <EcomEnterprisePack />,
      },
      {
        path: "/reseller-program",
        element: <Reseller />,
      },
      {
        path: "/ecommerce-guide",
        element: <EcommerceGuide />,
      },
      {
        path: "/data-center",
        element: <NewDataCenter />,
      },
      {
        path: "/our-technologies",
        element: <OurTechnologies />,
      },
      {
        path: "/cookie-policy",
        element: <CookiePolicy />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/vps-hosting",
        element: <VpsHosting />,
      },
      {
        path: "/web-hosting",
        element: <WebHosting />,
      },
      {
        path: "/dedicated-server",
        element: <DedicatedServer />,
      },
      {
        path: "/starter-web-pack",
        element: <StarterWebPack />,
      },
      {
        path: "/distributeurs-affiliation",
        element: <DistributeAffiliate />,
      },
      {
        path: "/hardwares",
        element: <Hardwares />,
      },
      {
        path: "/scotty-pumpkin",
        element: <ScottyPumpkinPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/invoice",
    element: <Invoice />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/coming_soon",
    element: <ComingSoon />,
  },
]);
