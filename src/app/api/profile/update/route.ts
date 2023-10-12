import { Database } from "@/lib/types/supabase";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const { avatar, firstName, lastName, email } = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const currentUser = await supabase.auth.getSession().then((data) => data);

  // TODO upload avatar

  // Change email
  const { data, error: updateEmailError } = await supabase.auth.updateUser({
    email: email,
  });

  console.log(data);

  if (updateEmailError) {
    return NextResponse.json({ error: updateEmailError }, { status: 400 });
  }

  const { error: updateProfileError } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      email: email,
      updated_at: new Date().toJSON(), // current time
    })
    .eq("id", currentUser.data.session?.user.id)
    .select();

  if (updateProfileError) {
    return NextResponse.json({ error: updateProfileError }, { status: 400 });
  }

  return NextResponse.json({ data: "user has been updated" }, { status: 301 });
}
