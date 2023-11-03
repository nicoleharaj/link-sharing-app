"use client";

import Navbar from "../components/Preview/Navbar";
import { Database } from "@/lib/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function Page() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

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
      setAvatar(profile.avatar);
    }
    getData();
  }, [router, supabase]);

  return (
    <>
      <Navbar />
      <main className="mt-[60px] flex h-[calc(100vh-102px)] items-start justify-center gap-6 p-4 tablet:p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-[104px] w-[104px] overflow-hidden rounded-full border-4 border-purple bg-purple">
            <Image src={avatar} fill alt="Avatar" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-heading-md-web font-bold ">
              {firstName} {lastName}
            </h1>
            <h2 className="text-gray">{email}</h2>
          </div>
        </div>
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </>
  );
}
