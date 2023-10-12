import { Database } from "@/lib/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Button from "./components/UI/Button";
import Container from "./components/UI/Container";
import LogoutButton from "./components/LogoutButton";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Mockup from "./components/Mockup";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <main className="flex h-[calc(100vh-102px)] items-start justify-center gap-6 p-4 tablet:p-6">
        <Mockup />
        <Container className="flex flex-col gap-6 p-0 tablet:p-10 desktop:h-full desktop:w-4/5">
          <div className="flex flex-col gap-2 px-6 pt-6 tablet:px-0 tablet:pt-0">
            <h1 className="text-heading-md-mobile font-bold tablet:text-heading-md-web">
              Customize your links
            </h1>
            <p className="text-gray">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>
          <div className="px-6 tablet:px-0">
            <Button className="mt-4 w-full" variant="secondary">
              + Add new link
            </Button>
          </div>

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

            <p className=" mb-[22.5px] text-center text-gray tablet:m-0">
              Use the &ldquo;Add new link&rdquo; button to get started. Once you
              have more than one link, you can reorder and edit them. We&apos;re
              here to help you share your profiles with everyone!
            </p>
          </Container>

          <div className="flex border-t border-gray-border px-6 pb-6 tablet:justify-end tablet:pb-0 tablet:pt-0">
            <Button className="mt-4 w-full tablet:w-fit" disabled>
              Save
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
}
