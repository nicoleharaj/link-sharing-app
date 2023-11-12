import { Database } from "@/lib/types/supabase";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();

  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const avatar = formData.get("avatar") as File;

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const currentUser = await supabase.auth.getSession().then((data) => data);

  if (currentUser.data.session?.user.email !== email) {
    // Change email
    const { data, error: updateEmailError } = await supabase.auth.updateUser({
      email: email,
    });

    if (updateEmailError) {
      return NextResponse.json({ error: updateEmailError }, { status: 400 });
    }
  }

  const file = avatar;

  const fileExt = avatar.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  if (file.size > 0) {
    let { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    let avatarUrl = supabase.storage
      .from("avatars")
      .getPublicUrl(uploadData!.path);

    const { error: updateProfileError } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date().toJSON(), // current time
        avatar: avatarUrl.data.publicUrl,
      })
      .eq("id", currentUser.data.session?.user.id)
      .select();

    if (updateProfileError) {
      return NextResponse.json({ error: updateProfileError }, { status: 400 });
    }
  }

  const { error: updateProfileError } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      updated_at: new Date().toJSON(), // current time
    })
    .eq("id", currentUser.data.session?.user.id)
    .select();

  if (updateProfileError) {
    return NextResponse.json({ error: updateProfileError }, { status: 400 });
  }

  return NextResponse.json({ data: "user has been updated" }, { status: 301 });
}
