"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../components/UI/Button";
import TextField from "../components/TextField";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/supabase";
import { AuthError } from "@supabase/supabase-js";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState<
    string | undefined
  >(undefined);

  const [serverError, setServerError] = useState<AuthError | null>(null);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/");
      }
    }
    getData();
  }, [router, supabase.auth]);

  function validate() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = true;

    if (!emailPattern.test(email)) {
      setEmailError("Must be a valid email");
      isValid = false;
    }

    if (!password.match(passwordConfirm)) {
      setPasswordConfirmError("Passwords must match");
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError("Must contain at least 8 characters");
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = validate();

    if (valid) {
      const data = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        }),
      }).then((res) => res.json());

      if (data.error) {
        setServerError(data.error);
        return;
      }
      router.replace("/");
    }
  };

  return (
    <main className="flex h-screen w-full flex-col gap-16 p-8 tablet:items-center tablet:justify-center">
      <Image
        src="/images/logo-devlinks-large.svg"
        alt="devlinks logo"
        width={182.5}
        height={40}
      />
      <section className="flex flex-col gap-10 rounded-xl tablet:w-[476px] tablet:bg-white tablet:p-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-heading-md-mobile font-bold">Create account</h1>
          <p className="text-gray">
            Let&apos;s get you started sharing your links!
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {serverError?.message && (
            <p className="text-center text-red">{serverError.message}</p>
          )}
          <TextField
            label="Email address"
            id="register-email"
            name="register-email"
            icon="/images/icon-email.svg"
            placeholder="e.g. alex@email.com"
            variant={emailError ? "error" : "default"}
            errorMessage={emailError}
            autoComplete="email"
            className="w-full"
            onChange={(e) => setEmail(e.target.value)}
            onClick={() => setEmailError(undefined)}
          />

          <TextField
            label="Create password"
            id="register-password"
            name="register-password"
            icon="/images/icon-password.svg"
            placeholder="At least 8 characters"
            type="password"
            variant={passwordError ? "error" : "default"}
            errorMessage={passwordError}
            autoComplete="password"
            className="w-full"
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => setPasswordError(undefined)}
          />

          <TextField
            label="Confirm password"
            id="register-password-confirm"
            name="register-password-confirm"
            icon="/images/icon-password.svg"
            placeholder="At least 8 characters"
            type="password"
            variant={passwordConfirmError ? "error" : "default"}
            errorMessage={passwordConfirmError}
            autoComplete="password"
            className="w-full"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onClick={() => setPasswordConfirmError(undefined)}
          />

          <p className="text-body-s text-gray">
            Password must contain at least 8 characters
          </p>

          <Button type="submit" className="w-full font-semibold">
            Create new account
          </Button>

          <p className="text-center text-gray">
            Already have an account? <br />
            <Link href="/login" className="text-purple">
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
