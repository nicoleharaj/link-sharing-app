import { Database } from "@/lib/types/supabase";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const { email, password, passwordConfirm } = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  if (!validatePassword(password) || password !== passwordConfirm)
    return NextResponse.json(
      { error: "Password does not meet requirements" },
      { status: 400 },
    );

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl("placeholder.png");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        email: email,
        first_name: "",
        last_name: "",
        avatar: data.publicUrl,
      },
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  return NextResponse.json({ data: "user has been created" }, { status: 301 });
}
