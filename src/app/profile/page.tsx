"use client";

import Image from "next/image";
import Button from "../components/Button";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { Database } from "@/lib/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadImageIcon } from "../components/UI/Icons";
import ProfileInput from "../components/TextField/ProfileInput";
import Mockup from "../components/Mockup";

export default function Page() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
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

      if (data.session.user.email) setEmail(data.session.user.email);
      if (data.session.user.user_metadata.firstName)
        setFirstName(data.session.user.user_metadata.firstName);
      if (data.session.user.user_metadata.lastName)
        setLastName(data.session.user.user_metadata.lastName);
    }
    getData();
  }, [router, supabase.auth]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setPreviewImage(reader.result as string);
      });

      reader.readAsDataURL(e.target.files[0]);
    }

    console.log(previewImage);
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {};

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
          <div className="mt-10 flex flex-col gap-6 px-6">
            <Container className="bg-gray-light p-5 tablet:p-5">
              <h2 className="text-gray">Profile picture</h2>
              {previewImage ? (
                <Button
                  className={`relative mt-4 h-[193px] w-[193px] overflow-hidden px-0 py-0 text-white tablet:px-0`}
                  onClick={() => fileRef.current?.click()}
                >
                  <div className="z-10 flex h-full w-[193px] flex-col items-center justify-center bg-black/50 py-[60px]">
                    <UploadImageIcon className="fill-white" />
                    <span>Change Image</span>
                  </div>
                  <Image
                    src={previewImage}
                    fill
                    alt="Uploaded preview"
                    className="object-cover"
                  />
                </Button>
              ) : (
                <Button
                  className="mt-4 h-[193px] w-[193px] flex-col bg-purple-light px-10 py-[60px] text-purple"
                  onClick={() => fileRef.current?.click()}
                >
                  <UploadImageIcon className="fill-purple" />
                  <span>+ Upload Image</span>
                </Button>
              )}
              <input
                type="file"
                ref={fileRef}
                multiple={false}
                hidden
                onChange={handleUpload}
                accept="image/png, image/jpeg, image/jpg"
              />
              <p className="font-gray mt-6 text-body-s">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </Container>
            <Container className="flex flex-col gap-3 bg-gray-light p-5 tablet:p-5">
              <ProfileInput
                label="First name*"
                noIcon
                className="w-full"
                defaultValue={firstName}
              />
              <ProfileInput
                label="Last name*"
                noIcon
                className="w-full"
                defaultValue={lastName}
              />
              <ProfileInput
                label="Email"
                noIcon
                className="w-full"
                defaultValue={email}
              />
            </Container>
          </div>
          <div className="mt-6 flex border-t border-gray-border px-6 pb-6 tablet:justify-end tablet:pb-0 tablet:pt-0">
            <Button className="mt-4 w-full tablet:w-fit" disabled>
              Save
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
}
