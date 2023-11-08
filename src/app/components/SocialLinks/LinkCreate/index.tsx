"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Container from "../../UI/Container";
import TextField from "../../TextField";
import Dropdown from "./Dropdown";
import { platforms } from "./platforms";
import { socialLinks } from "..";

export default function LinkCreate({
  index,
  setLinks,
}: {
  href: string;
  index: number;
  setLinks: Dispatch<SetStateAction<socialLinks[]>>;
}) {
  const [currentPlatform, setCurrentPlatform] = useState(platforms[0]);
  const [error, setError] = useState(false);

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
    <Container className="relative bg-gray-light tablet:p-5">
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
        variant={error ? "error" : "default"}
        placeholder={`e.g. ${currentPlatform.placeholder}`}
        onChange={handleUpdate}
      />
    </Container>
  );
}
