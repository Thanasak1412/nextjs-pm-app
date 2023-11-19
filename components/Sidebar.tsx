import Card from "./Card";
import SidebarLink from "./SidebarLInk";

type Links = {
  link: "/home" | "/calendar" | "/profile" | "/settings";
  icon: "Settings" | "Grid" | "Calendar" | "Users";
  label: "Home" | "Calendar" | "Profile" | "Settings";
}[];

const links: Links = [
  {
    label: "Home",
    icon: "Grid",
    link: "/home",
  },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  {
    label: "Profile",
    icon: "Users",
    link: "/profile",
  },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

export default function Sidebar() {
  return (
    <Card className="h-full flex flex-col justify-center items-center basis-40 flex-wrap gap-28">
      {links.map((link) => (
        <SidebarLink link={link} key={link.label} />
      ))}
    </Card>
  );
}
