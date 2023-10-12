"use client";

import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Navbar from "../components/Navbar";
import { Database } from "@/lib/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileInput from "../components/TextField/ProfileInput";
import Mockup from "../components/Mockup";
import UploadButton from "../components/UploadButton";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }

      let { data: profile } = await supabase
        .from("profiles")
        .select()
        .eq("id", data.session.user.id)
        .single();

      setEmail(data.session.user.email ?? "");
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
    }
    getData();
  }, [router, supabase]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = await fetch("/api/profile/update", {
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
            className="shadow-md rounded-full  bg-purple px-6 py-4 text-white"
          >
            Profile has been updated.
          </motion.div>
        )}
      </AnimatePresence>
    ));
  };

  return (
    <>
      <Navbar />
      <main className="flex h-[calc(100vh-102px)] items-start justify-center gap-6 p-4 tablet:p-6">
        <Mockup />
        <Container className="w-full p-0 tablet:p-10 desktop:h-full desktop:w-4/5">
          <div className="flex flex-col gap-2 px-6 pt-6 tablet:px-0 tablet:pt-0">
            <h1 className="text-heading-md-mobile font-bold">
              Profile Details
            </h1>
            <p className="text-gray">
              Add your details to create a personal touch to your profile.
            </p>
          </div>
          <form
            className="mt-10 flex flex-col gap-6 px-6"
            onSubmit={handleUpdate}
          >
            <Container className="bg-gray-light p-5 tablet:p-5">
              <h2 className="text-gray">Profile picture</h2>
              <UploadButton name="avatar" />
              <p className="font-gray mt-6 text-body-s">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </Container>
            <Container className="flex flex-col gap-3 bg-gray-light p-5 tablet:p-5">
              <ProfileInput
                label="First name"
                name="first_name"
                className="w-full"
                defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <ProfileInput
                label="Last name"
                name="last_name"
                className="w-full"
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <ProfileInput
                label="Email"
                name="email"
                className="w-full"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Container>
            <div className="mt-6 flex border-t border-gray-border px-6 pb-6 tablet:justify-end tablet:pb-0 tablet:pt-0">
              <Button className="mt-4 w-full tablet:w-fit">Save</Button>
            </div>
          </form>
        </Container>
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      </main>
    </>
  );
}
