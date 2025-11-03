"use server";

import { verifyRecaptchaToken } from "@/_lib/verify-recaptcha";

export async function verifyContactView(token: string) {
  if (!token) {
    return { success: false, error: "No verification token provided" };
  }

  const result = await verifyRecaptchaToken(token);
  return result;
}
