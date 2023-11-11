"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Image from "next/image";
import LinkCreate from "./LinkCreate";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

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
  id: number;
  type: validSocials;
  href: string;
};

export default function SocialLinks() {
  const [links, setLinks] = useState<Array<socialLinks>>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddLink = useCallback(() => {
    setLinks([
      ...links,
      { type: "github", href: "https://github.com", id: links.length + 1 },
    ]);
  }, [links]);

  useEffect(() => {
    handleAddLink;
  }, [handleAddLink, links]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(links);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    console.log(active, over)

    if (over && active.id !== over.id) {
      setLinks((links) => {
        const oldIndex = links.findIndex(link => link.id === active.id);
        const newIndex = links.findIndex(link => link.id === over.id);
      
        return arrayMove(links, oldIndex, newIndex);
      });
    }
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
        <Container className="mx-6 flex flex-col items-center gap-6 bg-gray-light tablet:mx-0 tablet:p-16">
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
        <Container className="mx-5 flex flex-col gap-6 p-0 tablet:mx-0 tablet:p-0">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={links.map((link) => link.id)}>
              {links.map((link, index) => (
                <LinkCreate
                  key={link.id}
                  id={link.id}
                  index={index}
                  setLinks={setLinks}
                />
              ))}
            </SortableContext>
          </DndContext>
        </Container>
      )}

      <div className="mt-4 flex border-t border-gray-border px-4 pb-6 tablet:justify-end tablet:px-0 tablet:pb-0 tablet:pt-0">
        <Button
          className="mt-4 w-full tablet:w-fit"
          disabled={links.length === 0}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
