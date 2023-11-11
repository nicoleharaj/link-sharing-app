"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Container from "../../UI/Container";
import TextField from "../../TextField";
import Dropdown from "./Dropdown";
import { platforms } from "./platforms";
import { socialLinks } from "..";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function LinkCreate({
  index,
  id,
  setLinks
}: {
  index: number;
  id: number;
  setLinks: Dispatch<SetStateAction<socialLinks[]>>;
}) {
  const [currentPlatform, setCurrentPlatform] = useState(platforms[0]);
  const [error, setError] = useState(false);

  const { setActivatorNodeRef, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = () => {
    setLinks((prevLinks) => prevLinks.filter((value, i) => i !== index));
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    let url = e.target.value.trim();

    if (url === "") {
      setError(false);
      return;
    }

    if (!url.startsWith("https://")) {
      url = "https://" + url;
    }

    if (url.match(currentPlatform.regex)) {
      setError(false);
      setLinks((links) =>
        links.map((item, i) =>
          i === index
            ? { ...item, href: url, type: currentPlatform.value }
            : item,
        ),
      );
    } else {
      setError(true);
    }
  };

  return (
    <Container
      className="relative bg-gray-light active:z-50 tablet:p-5"
      ref={setNodeRef}
      style={style}
    >
      <div className="group flex items-center justify-between gap-2 text-gray">
        <button
          aria-label="Drag-and-drop"
          ref={setActivatorNodeRef}
          {...listeners}
        >
          <Image
            src="/images/icon-drag-and-drop.svg"
            width={12}
            height={6}
            alt="Drag-and-drop icon"
          />
        </button>
        <h2 className="flex-grow text-heading-sm font-bold">
          Link #{index + 1}
        </h2>
        <button type="button" onClick={handleRemove}>
          Remove
        </button>
      </div>
      <h3 className="text-body-s text-gray-dark">Platform</h3>
      <Dropdown
        currentPlatform={currentPlatform}
        setCurrentPlatform={setCurrentPlatform}
      />
      <h3 className="text-body-s text-gray-dark">Link</h3>
      <TextField
        className="w-full"
        variant={error ? "error" : "default"}
        placeholder={`e.g. ${currentPlatform.placeholder}`}
        onChange={handleUpdate}
      />
    </Container>
  );
}
