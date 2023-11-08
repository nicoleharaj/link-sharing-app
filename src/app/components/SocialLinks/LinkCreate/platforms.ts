import { validSocials } from "..";

export type platform = {
  value: validSocials;
  label: string;
  icon: string;
  placeholder: string;
  regex: RegExp;
};

export const platforms: Array<platform> = [
  {
    value: "github",
    label: "GitHub",
    icon: "/images/icon-github.svg",
    placeholder: "github.com/johnappleseed",
    regex: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/?$/
  },
  {
    value: "frontendMentor",
    label: "Frontend Mentor",
    icon: "/images/icon-frontend-mentor.svg",
    placeholder: "frontendmentor.io/profile/johnappleseed",
    regex: /^https:\/\/(www\.)?frontendmentor\.io\/profile\/[a-zA-Z0-9_-]+\/?$/
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: "/images/icon-twitter.svg",
    placeholder: "twitter.com/johnappleseed",
    regex: /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}\/?$/
  },
  {
    value: "linkedIn",
    label: "LinkedIn",
    icon: "/images/icon-linkedin.svg",
    placeholder: "linkedin.com/in/johnappleseed",
    regex: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/
  },
  {
    value: "youTube",
    label: "YouTube",
    icon: "/images/icon-youtube.svg",
    placeholder: "youtube.com/@johnappleseed",
    regex: /^https:\/\/(www\.)?youtube\.com\/(@[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+)\/?$/
  },
  {
    value: "facebook",
    label: "Facebook",
    icon: "/images/icon-facebook.svg",
    placeholder: "facebook.com/johnappleseed",
    regex: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/
  },
  {
    value: "twitch",
    label: "Twitch",
    icon: "/images/icon-twitch.svg",
    placeholder: "twitch.tv/johnappleseed",
    regex: /^https:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9_]+\/?$/
  },
  {
    value: "devTo",
    label: "DEV Community",
    icon: "/images/icon-devto.svg",
    placeholder: "dev.to/johnappleseed",
    regex: /^https:\/\/(www\.)?dev\.to\/[a-zA-Z0-9_]+\/?$/
  },
  {
    value: "codewars",
    label: "Codewars",
    icon: "/images/icon-codewars.svg",
    placeholder: "codewars.com/users/johnappleseed",
    regex: /^https:\/\/(www\.)?codewars\.com\/users\/[a-zA-Z0-9_-]+\/?$/
  },
  {
    value: "freeCodeCamp",
    label: "FreeCodeCamp",
    icon: "/images/icon-freecodecamp.svg",
    placeholder: "freecodecamp.org/johnappleseed",
    regex: /^https:\/\/(www\.)?freecodecamp\.org\/[a-zA-Z0-9]+\/?$/
  },
  {
    value: "gitLab",
    label: "GitLab",
    icon: "/images/icon-gitlab.svg",
    placeholder: "gitlab.com/johnappleseed",
    regex: /^https:\/\/(www\.)?gitlab\.com\/[a-zA-Z0-9_.-]+\/?$/
  },
  {
    value: "hashnode",
    label: "Hashnode",
    icon: "/images/icon-hashnode.svg",
    placeholder: "hashnode.com/profile/johnappleseed",
    regex: /^https:\/\/(www\.)?hashnode\.com\/profile\/[a-zA-Z0-9_-]+\/?$/
  },
  {
    value: "stackOverflow",
    label: "Stack Overflow",
    icon: "/images/icon-stack-overflow.svg",
    placeholder: "stackoverflow.com/users/12345/john-appleseed",
    regex: /^https:\/\/(www\.)?stackoverflow\.com\/users\/\d+\/[a-zA-Z0-9_-]+\/?/
  },
];
