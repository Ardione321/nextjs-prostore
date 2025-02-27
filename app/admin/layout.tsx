import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/shared/header/menu";
import MainNav from "./main-nav";
import AdminSearch from "@/components/admin/admin-search";
// import { Input } from "@/components/ui/input";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b container mx-auto">
          <div className="flex items-center h-24 px-4">
            <Link href="/" className="w-22">
              <Image
                src="/images/suzy.jpg"
                height={48}
                width={48}
                alt={APP_NAME}
              />
            </Link>
            <MainNav className="mx-8" />
            <div className="ml-auto items-center flex space-x-4">
              <div className="hidden md:block">
                <AdminSearch />
                {/* <Input type="search" placeholder="Search..." className="md:w-[100] lg:w-[300]" /> */}
              </div>
              <Menu />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto">
        {/* <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto border border-gray-300 rounded-xl mt-5 shadow-md"> */}
          {children}
        </div>
      </div>
    </>
  );
}
