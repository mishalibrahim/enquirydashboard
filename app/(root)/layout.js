import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <main className="flex flex-col md:flex-row h-full w-full overflow-hidden">
      <Sidebar />
      <div className="flex md:hidden justify-between items-center h-[60px] w-full  shadow-md px-3">
        <div className="flex gap-2 items-center">
          <Image src="/assets/images/logo.svg" alt="" width={24} height={24} />
          <p className="">DemandDash</p>
        </div>
        <MobileNav />
      </div>
      {children}
    </main>
  );
}
