import Image from "next/image";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Link from "next/link";

export default function Page() {
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
          <h2 className="text-heading-md-mobile font-bold">Login</h2>
          <p className="text-gray">
            Add your details below to get back into the app
          </p>
        </div>

        <form className="flex flex-col gap-6" method="POST" action="/auth/login">
          <TextField
            label="Email address"
            id="login-email"
            icon="/images/icon-email.svg"
            placeholder="e.g. alex@email.com"
            className="w-full"
          />

          <TextField
            label="Password"
            id="login-password"
            type="password"
            icon="/images/icon-password.svg"
            placeholder="Enter your password"
            className="w-full"
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
