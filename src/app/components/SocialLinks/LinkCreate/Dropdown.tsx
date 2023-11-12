import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { iconMap, platform, platforms } from "./platforms";
import { SocialLink, validSocials } from "..";

export default function Dropdown({
  linkId,
  currentPlatform,
  setCurrentPlatform,
  setLinks,
}: {
  linkId: number;
  currentPlatform: platform;
  setCurrentPlatform: Dispatch<SetStateAction<platform>>;
  setLinks: Dispatch<SetStateAction<SocialLink[]>>;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (platform: {
    value: validSocials;
    label: string;
    placeholder: string;
    regex: RegExp;
  }) => {
    setCurrentPlatform(platform);
    setShowMenu(false);
  
    setLinks((links) => {
      return links.map((item) =>
        linkId === item.id ? { ...item, type: platform.value } : item
      );
    });
  };

  const CurrentPlatformIcon = iconMap[currentPlatform.value];

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className={
          "relative flex w-full items-center gap-3 rounded-lg border border-gray-border bg-white px-4 py-3 focus:border-purple focus:shadow-active active:border-purple active:shadow-active"
        }
        aria-label="Platform select"
      >
        <CurrentPlatformIcon className="text-gray" />
        <span className="flex-grow text-left">{currentPlatform.label}</span>
        <Image
          src="/images/icon-chevron-down.svg"
          alt=""
          width={12}
          height={6}
          className={`w-auto ${showMenu ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {showMenu && (
        <ul
          className="absolute z-20 mt-2 h-48 w-[calc(100%-3rem)] overflow-y-scroll rounded-lg border border-gray-border bg-white px-4 py-3 shadow tablet:w-[calc(100%-2.5rem)]"
          ref={menuRef}
        >
          {platforms.map((platform, index) => {
            const PlatformIcon = iconMap[platform.value];

            return (
              <li key={platform.value} className="text-gray-dark">
                <button
                  value={platform.value}
                  className={`flex w-full items-center gap-3 border-b border-gray-border py-3 ${
                    index === 0 && platforms.length > 1 ? "py-0 pb-3" : ""
                  } ${
                    index === platforms.length - 1 ? "border-b-0 py-0 pt-3" : ""
                  } ${platforms.length === 1 ? "py-0 pb-0 pt-0" : ""}`}
                  onClick={() => handleSelect(platform)}
                  type="button"
                >
                  <PlatformIcon className="text-gray" />
                  {platform.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
