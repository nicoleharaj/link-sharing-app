import Image from "next/image";
import Container from "../Container";

export default function Mockup() {
  return (
    <Container className="invisible hidden h-full  desktop:visible desktop:flex desktop:w-1/2 desktop:flex-col desktop:items-center desktop:justify-center">
      <Image
        src="/images/illustration-phone-mockup.svg"
        alt="mockup"
        width={307}
        height={631}
        className="select-none"
      />
    </Container>
  );
}
