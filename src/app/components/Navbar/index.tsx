import Link from "next/link";
import Container from "../Container";
import Button from "../Button";
import Image from "next/image";
import Tabs from "../Tabs";

export default function Navbar() {
  return (
    <nav className="w-full p-0 tablet:px-6 tablet:pt-6">
      <Container className="flex h-[74px] items-center justify-between rounded-none bg-white p-4 tablet:h-[78px] tablet:rounded-xl tablet:p-6">
        <Link href="/" aria-label="Home">
          <Image
            src="/images/logo-devlinks-large.svg"
            alt="devlinks logo"
            width={182.5}
            height={40}
            className="invisible hidden tablet:visible tablet:block"
          />
          <Image
            src="/images/logo-devlinks-small.svg"
            alt="devlinks logo"
            width={32}
            height={32}
            className="visible block tablet:invisible tablet:hidden "
          />
        </Link>

        <Tabs />

        <Button variant="secondary">
          <Image
            src="/images/icon-preview-header.svg"
            width={20}
            height={20}
            alt="Sign out icon"
          />
          <span className="sr-only tablet:not-sr-only">Preview</span>
        </Button>
      </Container>
    </nav>
  );
}
