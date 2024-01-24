import { useEffect, useState } from "react";
import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

import MobileSidebar from "@/components/Mobile/Sidebar";
import DesktopSidebar from "@/components/Desktop/Sidebar";
import Header from "@/components/Header";
import { useRouter } from "next/router";

let sidebarNavigation = [
  { name: "Dashboard", href: "dashboard", icon: HomeIcon, current: true },
  { name: "Products", href: "products", icon: UsersIcon, current: false },
  { name: "Invoices", href: "invoices", icon: FolderIcon, current: false },
];

const userNavigation = [
  { name: "Your profile", href: "/app/profile" },
  { name: "Sign out", href: "/" },
];

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState(sidebarNavigation);
  const router = useRouter();

  useEffect(() => {
    const updatedNavigation = navigation.map((navItem) => ({
      ...navItem,
      current: router.pathname.includes(navItem.href),
    }));
    setNavigation(updatedNavigation);
  }, [router]);

  console.log(navigation.filter((item) => router.pathname.includes(item.href)));

  return (
    <>
      <div>
        <MobileSidebar
          navigation={navigation}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        {/* Static sidebar for desktop */}
        <DesktopSidebar navigation={navigation} />

        <div className="lg:pl-72">
          <Header
            userNavigation={userNavigation}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
