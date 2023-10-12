"use client";

import Image from "next/image";
import TextField from "../components/TextField";
import Button from "../components/UI/Button";
import Link from "next/link";
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

  function validate(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = true;

    // Check email pattern
    if (!emailPattern.test(email)) {
      setEmailError("Must be a valid email");
      isValid = false;
    }

    // Check password non-emptiness
    if (!password || password.length === 0) {
      setPasswordError("Cannot be empty");
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = validate();

    if (valid) {
      const data = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
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
          <h1 className="text-heading-md-mobile font-bold">Login</h1>
          <p className="text-gray">
            Add your details below to get back into the app
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {serverError?.message && (
            <p className="text-center text-red">{serverError.message}</p>
          )}
          <TextField
            label="Email address"
            id="login-email"
            name="login-email"
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
            label="Password"
            id="login-password"
            name="login-password"
            type="password"
            icon="/images/icon-password.svg"
            placeholder="Enter your password"
            variant={passwordError ? "error" : "default"}
            errorMessage={passwordError}
            autoComplete="password"
            className="w-full"
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => setPasswordError(undefined)}
          />

          <Button type="submit" className="w-full font-semibold">
            Login
          </Button>

          <p className="text-center text-gray">
            Don&apos;t have an account? <br />
            <Link href="/signup" className="text-purple">
              Create account
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
