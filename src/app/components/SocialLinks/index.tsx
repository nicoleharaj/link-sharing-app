"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

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

export type SocialLink = {
  id: number;
  type: validSocials;
  href: string;
};

export default function SocialLinks({
  links,
  setLinks,
}: {
  links: SocialLink[];
  setLinks: Dispatch<SetStateAction<SocialLink[]>>;
}) {
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
  }, [links, setLinks]);

  useEffect(() => {
    handleAddLink;
  }, [handleAddLink, links]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const links = formData.entries();

    console.log(links);

    const data = await fetch("/api/profile/links/update", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    toast.custom((t) => (
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut" }}
            className="rounded-xl bg-purple px-6 py-4 text-white shadow"
          >
            Links have been updated.
          </motion.div>
        )}
      </AnimatePresence>
    ));
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      setLinks((links) => {
        const oldIndex = links.findIndex((link) => link.id === active.id);
        const newIndex = links.findIndex((link) => link.id === over.id);

        return arrayMove(links, oldIndex, newIndex);
      });
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleUpdate}>
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
        <Container className="mx-3 flex flex-col items-center gap-3 bg-gray-light tablet:mx-0 tablet:p-16">
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
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </form>
  );
}
