"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, accessToken, safeNextPath } from "@/lib/access";

export async function unlock(formData: FormData) {
  const next = safeNextPath(formData.get("next"));
  const expected = await accessToken(process.env.PROTECTED_PASSWORD);
  const given = await accessToken(String(formData.get("password") ?? ""));

  if (!expected || given !== expected) {
    redirect(`/unlock?next=${encodeURIComponent(next)}&error=1`);
  }

  (await cookies()).set(ACCESS_COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  redirect(next);
}
