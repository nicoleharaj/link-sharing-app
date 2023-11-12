"use client";
import { SocialLink } from "../SocialLinks";
import LinkButton from "../SocialLinks/LinkButton";
import Container from "../UI/Container";
import UserInfo from "../UserInfo";
import Phone from "./Phone";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function Mockup({ links }: { links: SocialLink[] }) {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <Container className="invisible hidden h-full desktop:visible desktop:flex desktop:w-1/2 desktop:flex-col desktop:items-center desktop:justify-center">
      <div
        {...events}
        ref={ref}
        className="hide-scrollbar z-20 flex h-[632px] w-[308px] cursor-grab touch-pan-y flex-col gap-[18px] overflow-y-scroll px-[35px] py-16"
        style={{ clipPath: "url(#iphoneClip)" }}
      >
        <UserInfo />
        {links.length !== 0 && (
          <ul className="flex select-none flex-col gap-5">
            {links.map((link) => (
              <LinkButton link={link} key={link.id} />
            ))}
          </ul>
        )}
      </div>
      <Phone links={links} />
    </Container>
  );
}
