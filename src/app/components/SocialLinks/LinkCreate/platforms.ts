import { validSocials } from "..";
import {
  GitHubIcon,
  FrontendMentorIcon,
  TwitterIcon,
  LinkedInIcon,
  YouTubeIcon,
  FacebookIcon,
  TwitchIcon,
  DevToIcon,
  CodewarsIcon,
  FreeCodeCampIcon,
  GitLabIcon,
  HashnodeIcon,
  StackOverflowIcon,
} from "../../UI/SocialIcons";

export const iconMap = {
  github: GitHubIcon,
  frontendMentor: FrontendMentorIcon,
  twitter: TwitterIcon,
  linkedIn: LinkedInIcon,
  youTube: YouTubeIcon,
  facebook: FacebookIcon,
  twitch: TwitchIcon,
  devTo: DevToIcon,
  codewars: CodewarsIcon,
  freeCodeCamp: FreeCodeCampIcon,
  gitLab: GitLabIcon,
  hashnode: HashnodeIcon,
  stackOverflow: StackOverflowIcon,
};

export type platform = {
  value: validSocials;
  label: string;
  placeholder: string;
  regex: RegExp;
};

export const platforms: Array<platform> = [
  {
    value: "github",
    label: "GitHub",
    placeholder: "github.com/johnappleseed",
    regex:
      /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/?$/,
  },
  {
    value: "frontendMentor",
    label: "Frontend Mentor",
    placeholder: "frontendmentor.io/profile/johnappleseed",
    regex: /^https:\/\/(www\.)?frontendmentor\.io\/profile\/[a-zA-Z0-9_-]+\/?$/,
  },
  {
    value: "twitter",
    label: "Twitter",
    placeholder: "twitter.com/johnappleseed",
    regex: /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}\/?$/,
  },
  {
    value: "linkedIn",
    label: "LinkedIn",
    placeholder: "linkedin.com/in/johnappleseed",
    regex: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
  },
  {
    value: "youTube",
    label: "YouTube",
    placeholder: "youtube.com/@johnappleseed",
    regex:
      /^https:\/\/(www\.)?youtube\.com\/(@[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+)\/?$/,
  },
  {
    value: "facebook",
    label: "Facebook",
    placeholder: "facebook.com/johnappleseed",
    regex: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/,
  },
  {
    value: "twitch",
    label: "Twitch",
    placeholder: "twitch.tv/johnappleseed",
    regex: /^https:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9_]+\/?$/,
  },
  {
    value: "devTo",
    label: "DEV Community",
    placeholder: "dev.to/johnappleseed",
    regex: /^https:\/\/(www\.)?dev\.to\/[a-zA-Z0-9_]+\/?$/,
  },
  {
    value: "codewars",
    label: "Codewars",
    placeholder: "codewars.com/users/johnappleseed",
    regex: /^https:\/\/(www\.)?codewars\.com\/users\/[a-zA-Z0-9_-]+\/?$/,
  },
  {
    value: "freeCodeCamp",
    label: "FreeCodeCamp",
    placeholder: "freecodecamp.org/johnappleseed",
    regex: /^https:\/\/(www\.)?freecodecamp\.org\/[a-zA-Z0-9]+\/?$/,
  },
  {
    value: "gitLab",
    label: "GitLab",
    placeholder: "gitlab.com/johnappleseed",
    regex: /^https:\/\/(www\.)?gitlab\.com\/[a-zA-Z0-9_.-]+\/?$/,
  },
  {
    value: "hashnode",
    label: "Hashnode",
    placeholder: "hashnode.com/profile/johnappleseed",
    regex: /^https:\/\/(www\.)?hashnode\.com\/profile\/[a-zA-Z0-9_-]+\/?$/,
  },
  {
    value: "stackOverflow",
    label: "Stack Overflow",
    placeholder: "stackoverflow.com/users/12345/john-appleseed",
    regex:
      /^https:\/\/(www\.)?stackoverflow\.com\/users\/\d+\/[a-zA-Z0-9_-]+\/?/,
  },
];
