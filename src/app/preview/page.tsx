"use client";

import Navbar from "../components/Preview/Navbar";
import React from "react";
import { Toaster } from "react-hot-toast";
import UserInfo from "../components/UserInfo";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="mt-[60px] flex h-[calc(100vh-102px)] items-start justify-center gap-6 p-4 tablet:p-6">
        <UserInfo />
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </>
  );
}
