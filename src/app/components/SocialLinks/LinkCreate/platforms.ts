import { validSocials } from "..";

export type platform = {
  value: validSocials;
  label: string;
  icon: string;
  placeholder: string;
};

export const platforms: Array<platform> = [
  {
    value: "github",
    label: "GitHub",
    icon: "/images/icon-github.svg",
    placeholder: "github.com/johnappleseed",
  },
  {
    value: "frontendMentor",
    label: "Frontend Mentor",
    icon: "/images/icon-frontend-mentor.svg",
    placeholder: "frontendmentor.io/profile/johnappleseed",
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: "/images/icon-twitter.svg",
    placeholder: "twitter.com/johnappleseed",
  },
  {
    value: "linkedIn",
    label: "LinkedIn",
    icon: "/images/icon-linkedin.svg",
    placeholder: "linkedin.com/in/johnappleseed",
  },
  {
    value: "youTube",
    label: "YouTube",
    icon: "/images/icon-youtube.svg",
    placeholder: "youtube.com/@johnappleseed",
  },
  {
    value: "facebook",
    label: "Facebook",
    icon: "/images/icon-facebook.svg",
    placeholder: "facebook.com/johnappleseed",
  },
  {
    value: "twitch",
    label: "Twitch",
    icon: "/images/icon-twitch.svg",
    placeholder: "twitch.tv/johnappleseed",
  },
  {
    value: "devTo",
    label: "DEV Community",
    icon: "/images/icon-devto.svg",
    placeholder: "dev.to/johnappleseed",
  },
  {
    value: "codewars",
    label: "Codewars",
    icon: "/images/icon-codewars.svg",
    placeholder: "codewars.com/users/johnappleseed",
  },
  {
    value: "freeCodeCamp",
    label: "FreeCodeCamp",
    icon: "/images/icon-freecodecamp.svg",
    placeholder: "freecodecamp.org/johnappleseed",
  },
  {
    value: "gitLab",
    label: "GitLab",
    icon: "/images/icon-gitlab.svg",
    placeholder: "gitlab.com/johnappleseed",
  },
  {
    value: "hashnode",
    label: "Hashnode",
    icon: "/images/icon-hashnode.svg",
    placeholder: "hashnode.com/profile/johnappleseed",
  },
  {
    value: "stackOverflow",
    label: "Stack Overflow",
    icon: "/images/icon-stack-overflow.svg",
    placeholder: "stackoverflow.com/12345/john-appleseed",
  },
];
