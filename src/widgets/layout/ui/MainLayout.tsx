import { Outlet } from "react-router-dom";
import { Toaster } from "@/shared/ui";
import { Header } from "./header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
