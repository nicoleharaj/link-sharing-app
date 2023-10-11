import Tab from "./Tab";

export default function Tabs() {
  const links = [
    {
      label: "Links",
      href: "/",
      icon: "link",
    },
    {
      label: "Profile details",
      href: "/profile",
      icon: "profile",
    },
  ];

  return (
    <ul className="flex w-full flex-grow justify-center">
      {links.map((link, index) => (
        <Tab href={link.href} key={link.href ?? index} icon={link.icon}>
          {link.label}
        </Tab>
      ))}
    </ul>
  );
}
