import Generic from "cryptocurrency-icons/svg/icon/generic.svg";

import { PageHeading } from "@/types";
import {
  Dashboard,
  Discord as DiscordIcon,
  Services,
  Star as StarIcon,
} from "@/assets/svgs";

import { icons } from "@/config/icons";

 export const socialMedia = [
    {
      Icon: DiscordIcon,
      link: "https://discord.com",
      title: "Discord",
    },
  ];

export const pageHeading: PageHeading[] = [
    {
      pathName: "earn",
      heading: "Earn",
    },
    {
      pathName: "trade",
      heading: "Trade",
    },
    {
      pathName: "dashboard",
      heading: "",
    },
  ];

export const getTokenIcon = (key: string) => {
  const icon = icons[key.toUpperCase() as keyof typeof icons];
  return icon || Generic;
};