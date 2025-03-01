import { ReactNode } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div>
      <Header />
      <SideBar />
      <main className="bg-white">{children}</main>
      <Footer />
    </div>
  );
}
