import Image from "next/image";
import Button from "./Button";

export default function LogoutButton() {
  return (
    <form action="/auth/logout" method="POST">
      <Button variant="secondary" aria-label="Sign out" className="h-full">
        <Image
          src="/images/icon-log-out.svg"
          width={20}
          height={20}
          alt="Sign out icon"
        />
      </Button>
    </form>
  );
}
