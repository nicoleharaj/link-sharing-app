"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Container from "../../UI/Container";
import TextField from "../../TextField";
import Dropdown from "./Dropdown";
import { platforms } from "./platforms";
import { socialLinks, validSocials } from "..";

export default function LinkCreate({
  index,
  setLinks,
}: {
  href: string;
  index: number;
  setLinks: Dispatch<SetStateAction<socialLinks[]>>;
}) {
  const [currentPlatform, setCurrentPlatform] = useState(platforms[0]);

  const handleRemove = () => {
    setLinks((prevLinks) => prevLinks.filter((value, i) => i !== index));
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setLinks((links) =>
      links.map((item, i) =>
        i === index
          ? { ...item, href: e.target.value, type: currentPlatform.value }
          : item,
      ),
    );
  };

  return (
    <Container className="relative mx-6 bg-gray-light">
      <div className="flex justify-between text-gray">
        <h2 className="text-heading-sm font-bold">Link #{index + 1}</h2>
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
        placeholder={`e.g. ${currentPlatform.placeholder}`}
        onChange={handleUpdate}
      />
    </Container>
  );
}
