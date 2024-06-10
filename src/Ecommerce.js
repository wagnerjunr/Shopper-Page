import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { ShopProvider } from "./Context/Allproduct";
import ScrollTop from "./Components/ScrollTop/ScrollTop";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "./ecommerce.css";

function Ecommerce() {
  return (
    <div className="ecommerce">
      <SkeletonTheme baseColor="#F1EFF1" highlightColor="#FFFFFF">
        <ShopProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </ShopProvider>
        <ScrollTop />
      </SkeletonTheme>
    </div>
  );
}

export default Ecommerce;
