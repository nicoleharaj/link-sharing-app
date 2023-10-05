import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";
import TextField from "../components/TextField";

export default function Page() {
  return (
    <main className="tablet:justify-center tablet:items-center flex h-screen w-full flex-col gap-16 p-8">
      <Image
        src="/images/logo-devlinks-large.svg"
        alt="devlinks logo"
        width={182.5}
        height={40}
      />
      <section className="tablet:bg-white tablet:w-[476px] flex flex-col gap-10 rounded-xl tablet:p-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-heading-md-mobile font-bold">Create account</h2>
          <p className="text-gray">
            Let&apos;s get you started sharing your links!
          </p>
        </div>

        <form className="flex flex-col gap-6">
          <TextField
            label="Email address"
            id="register-email"
            icon="/images/icon-email.svg"
            placeholder="e.g. alex@email.com"
            className="w-full"
          />

          <TextField
            label="Create password"
            id="register-password"
            icon="/images/icon-password.svg"
            placeholder="At least 8 characters"
            className="w-full"
          />

          <TextField
            label="Confirm password"
            id="register-password-confirm"
            icon="/images/icon-password.svg"
            placeholder="At least 8 characters"
            className="w-full"
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
