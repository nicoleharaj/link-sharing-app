"use client";

import Navbar from "../components/Preview/Navbar";
import { Database } from "@/lib/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import useUserProfile from "../hooks/useUserProfile";

export default function Page() {
  const { avatar, firstName, lastName, email, loading} = useUserProfile();

  if (loading) {
    return <>loading...</>
  }

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
