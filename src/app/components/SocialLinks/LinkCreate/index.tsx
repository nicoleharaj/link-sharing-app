"use client";

import { useState } from "react";
import Container from "../../UI/Container";
import Image from "next/image";
import TextField from "../../TextField";

export default function LinkCreate({
  href,
  value,
  index,
}: {
  href: string;
  value: string;
  index: number;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const platforms = [
    {
      value: "github",
      label: "GitHub",
      icon: "/images/icon-github.svg",
      placeholder: "https://www.github.com/johnappleseed",
    },
    {
      value: "frontendMentor",
      label: "Frontend Mentor",
      icon: "/images/icon-frontend-mentor.svg",
      placeholder: "https://www.frontendmentor.io/profile/johnappleseed",
    },
    {
      value: "twitter",
      label: "Twitter",
      icon: "/images/icon-twitter.svg",
      placeholder: "https://www.twitter.com/johnappleseed",
    },
    {
      value: "linkedIn",
      label: "LinkedIn",
      icon: "/images/icon-linkedin.svg",
      placeholder: "https://www.linkedin.com/in/johnappleseed",
    },
    {
      value: "youTube",
      label: "YouTube",
      icon: "/images/icon-youtube.svg",
      placeholder: "https://www.youtube.com/@johnappleseed",
    },
  ];
  const [currentPlatform, setCurrentPlatform] = useState(platforms[0]);

  const handleSelect = (platform: {
    value: string;
    label: string;
    icon: string;
    placeholder: string;
  }) => {
    setCurrentPlatform(platform);
    setShowMenu(false);
  };

  return (
    <Container className="relative mx-6 bg-gray-light">
      <div className="flex justify-between text-gray">
        <h2 className="text-heading-sm font-bold">Link #{index + 1}</h2>
        <button type="button">Remove</button>
      </div>
      <h3 className="text-body-s text-gray-dark">Platform</h3>
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className={
          "relative flex w-full items-center gap-3 rounded-lg border border-gray-border bg-white px-4 py-3 focus:border-purple focus:shadow-active active:border-purple active:shadow-active"
        }
        aria-label="Platform select"
      >
        <Image src={currentPlatform.icon} alt="link" width={16} height={16} />
        <span className="flex-grow text-left">{currentPlatform.label}</span>
        <Image
          src="/images/icon-chevron-down.svg"
          alt=""
          width={12}
          height={6}
          className={`${showMenu ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {showMenu && (
        <ul className="absolute z-20 mt-2 h-[148px] w-full overflow-y-scroll rounded-lg border border-gray-border bg-white px-4 py-3 shadow">
          {platforms.map((platform) => (
            <li
              key={platform.value}
              className="border-b border-gray-border py-3 first-of-type:py-0 first-of-type:pb-3 last-of-type:border-b-0 last-of-type:py-0 last-of-type:pt-3 only-of-type:py-0 only-of-type:pb-0 only-of-type:pt-0"
            >
              <button
                value={platform.value}
                className="flex w-full items-center gap-3"
                onClick={() => handleSelect(platform)}
                type="button"
              >
                <Image
                  src={platform.icon}
                  width={16}
                  height={16}
                  alt="Platform"
                />
                {platform.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-body-s text-gray-dark">Link</h3>
      <TextField className="w-full" placeholder={`e.g. ${currentPlatform.placeholder}`} />
    </Container>
  );
}
