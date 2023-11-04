"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Image from "next/image";
import LinkCreate from "./LinkCreate";

export type validSocials =
  | "github"
  | "frontendMentor"
  | "twitter"
  | "linkedIn"
  | "youTube"
  | "facebook"
  | "twitch"
  | "devTo"
  | "codewars"
  | "freeCodeCamp"
  | "gitLab"
  | "hashnode"
  | "stackOverflow";

export type socialLinks = {
  type: validSocials;
  href: string;
};

export default function SocialLinks() {
  const [links, setLinks] = useState<Array<socialLinks>>([]);

  const handleAddLink = useCallback(() => {
    setLinks([...links, { type: "github", href: "https://github.com" }]);
  }, [links]);

  useEffect(() => {
    handleAddLink;
  }, [handleAddLink]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(links);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="px-6 tablet:px-0">
        <Button
          className="mb-4 mt-4 w-full"
          variant="secondary"
          type="button"
          onClick={handleAddLink}
        >
          + Add new link
        </Button>
      </div>

      {links.length === 0 ? (
        <Container className="mx-6 flex flex-col items-center gap-6 bg-gray-light tablet:mx-0 tablet:p-20">
          <div className="relative mt-[22.5px] h-[80px] w-[125px] tablet:m-0 tablet:h-[160px] tablet:w-[250px]">
            <Image
              src="/images/illustration-empty.svg"
              alt="Get started"
              fill
            />
          </div>
          <h2 className="text-heading-md-mobile font-bold tablet:text-heading-md-web">
            Let&apos;s get you started
          </h2>

          <p className="mb-[22.5px] text-center text-gray tablet:m-0">
            Use the &ldquo;Add new link&rdquo; button to get started. Once you
            have more than one link, you can reorder and edit them. We&apos;re
            here to help you share your profiles with everyone!
          </p>
        </Container>
      ) : (
        <>
          {links.map((link, index) => (
            <LinkCreate
              key={index}
              href={link.href}
              index={index}
              setLinks={setLinks}
            />
          ))}
        </>
      )}

      <div className="mt-4 flex border-t border-gray-border px-6 pb-6 tablet:justify-end tablet:pb-0 tablet:pt-0">
        <Button className="mt-4 w-full tablet:w-fit">Save</Button>
      </div>
    </form>
  );
}
