import { Database } from "@/lib/types/supabase";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  console.log("called")
  const formData = await request.formData();

  const links = formData.get("socialLinks");

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const currentUser = await supabase.auth.getSession().then((data) => data);

  const { data, error } = await supabase
    .from("profiles")
    .update({ social_links: links })
    .eq("id", currentUser.data.session?.user.id);

  return NextResponse.json(
    { data: "user links have been updated" },
    { status: 301 },
  );
}
