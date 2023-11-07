"use client";
import Container from "../UI/Container";
import UserInfo from "../UserInfo";
import Phone from "./Phone";

export default function Mockup() {
  


  return (
    <Container className="invisible hidden h-full  desktop:visible desktop:flex desktop:w-1/2 desktop:flex-col desktop:items-center">
      <div className="z-20 mt-14">{/* <UserInfo /> */}</div>
      <Phone/>
    </Container>
  );
}
