import { Metadata } from "next";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign up | devlinks",
};

export default async function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
