"use client";

import { useState } from "react";
import Mockup from "../LiveMobilePreview";
import SocialLinks, { SocialLink } from "../SocialLinks";
import Container from "../UI/Container";

export default function MainContent() {
  const [links, setLinks] = useState<Array<SocialLink>>([]);

  return (
    <main className="flex h-[calc(100vh-102px)] items-start justify-center gap-6 p-4 tablet:p-6">
      <Mockup links={links} />
      <Container className="flex flex-col gap-6 p-0 tablet:p-10 desktop:min-h-full desktop:w-4/5">
        <div className="flex flex-col gap-2 px-6 pt-6 tablet:px-0 tablet:pt-0">
          <h1 className="text-heading-md-mobile font-bold tablet:text-heading-md-web">
            Customize your links
          </h1>
          <p className="text-gray">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>

        <SocialLinks setLinks={setLinks} links={links} />
      </Container>
    </main>
  );
}
