"use client";

import { usePathname } from "next/navigation";
import { Grid, Calendar, Settings, Users } from "react-feather";
import clsx from "clsx";
import Link from "next/link";

const icons = { Grid, Calendar, Settings, Users };

type Props = {
  link: {
    link: "/home" | "/calendar" | "/profile" | "/settings";
    icon: "Settings" | "Grid" | "Calendar" | "Users";
    label: "Home" | "Calendar" | "Profile" | "Settings";
  };
};

export default function SidebarLink({ link }: Readonly<Props>) {
  const pathname = usePathname();
  let isActive = false;

  if (link.link === pathname) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link href={link.link}>
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
}
