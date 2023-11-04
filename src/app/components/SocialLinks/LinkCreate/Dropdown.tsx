import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { platform, platforms } from "./platforms";
import { validSocials } from "..";

export default function Dropdown({
  setCurrentPlatform,
  currentPlatform,
}: {
  setCurrentPlatform: Dispatch<SetStateAction<platform>>;
  currentPlatform: platform;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const handleSelect = (platform: {
    value: validSocials;
    label: string;
    icon: string;
    placeholder: string;
  }) => {
    setCurrentPlatform(platform);
    setShowMenu(false);
  };

  return (
    <>
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
        <ul className="absolute z-20 mt-2 h-[148px] w-[calc(100%-3rem)] overflow-y-scroll rounded-lg border border-gray-border bg-white px-4 py-3 shadow tablet:w-[calc(100%-5rem)]">
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
    </>
  );
}
