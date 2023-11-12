import Image from "next/image";
import { SocialLink, validSocials } from ".";
import { iconMap, platforms } from "./LinkCreate/platforms";
import {
  CodewarsIcon,
  DevToIcon,
  FacebookIcon,
  FreeCodeCampIcon,
  FrontendMentorIcon,
  GitHubIcon,
  GitLabIcon,
  HashnodeIcon,
  LinkedInIcon,
  StackOverflowIcon,
  TwitchIcon,
  TwitterIcon,
  YouTubeIcon,
} from "../UI/SocialIcons";
import { RightArrowIcon } from "../UI/Icons";

export default function LinkButton({ link }: { link: SocialLink }) {
  const platform =
    platforms.find((platform) => platform.value === link.type) ?? platforms[0];

  const colorVariants = {
    github: "bg-social-github text-white",
    frontendMentor: "bg-social-frontendmentor border border-gray-border",
    twitter: "bg-social-twitter text-white",
    linkedIn: "bg-social-linkedin text-white",
    youTube: "bg-social-youtube text-white",
    facebook: "bg-social-facebook text-white",
    twitch: "bg-social-twitch text-white",
    devTo: "bg-social-devto text-white",
    codewars: "bg-social-codewars text-white",
    freeCodeCamp: "bg-social-freecodecamp text-white",
    gitLab: "bg-social-gitlab text-white",
    hashnode: "bg-social-hashnode text-white",
    stackOverflow: "bg-social-stackoverflow text-white",
    // more mappings
  };

  const PlatformIcon = iconMap[platform.value];

  return (
    <li className="flex">
      <a
        href={link.href}
        target="_blank"
        referrerPolicy="no-referrer"
        className={`flex h-11 w-full items-center justify-between gap-2  rounded-lg px-4 py-[10px] ${
          colorVariants[platform.value]
        }`}
      >
        <PlatformIcon />
        <span className="flex-grow">{platform.label}</span>
        <RightArrowIcon />
      </a>
    </li>
  );
}
