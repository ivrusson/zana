import { MainMenu } from "@/components/MainMenu";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div
        data-tauri-drag-region
        className="absolute top-0 w-full h-7 bg-black-50/25 cursor-pointer"
      />
      <main className="bg-black prose p-5 min-h-screen">
        <MainMenu />
        <Outlet />
        <Toaster />
      </main>
    </>
  );
};

export default Layout;
