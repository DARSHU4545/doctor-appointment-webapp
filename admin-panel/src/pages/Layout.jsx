import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div className="  w-full h-screen flex">
      <Sidebar className="w-[20%]" />

      <div className=" w-[100%]">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
