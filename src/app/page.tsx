import { Database } from "@/lib/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Container from "./components/UI/Container";
import Navbar from "./components/Navbar";
import Mockup from "./components/Mockup";
import SocialLinks from "./components/SocialLinks";

export default async function Home() {
  // const [links, setLinks] = useState<Array<socialLinks> | null>(null);

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

          <SocialLinks />
        </Container>
      </main>
    </>
  );
}
