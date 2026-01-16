"use server";

import { verifyRecaptchaToken } from "@/_lib/verify-recaptcha";
import generalData from "@/_data/general-data.json";

export async function getContactInfo(token: string) {
  if (!token) {
    return { success: false, error: "No reCAPTCHA token provided" };
  }

  const verification = await verifyRecaptchaToken(token);

  if (!verification.success) {
    return { 
      success: false, 
      error: verification.error || "reCAPTCHA verification failed" 
    };
  }

  // If verification is successful, return the contact information
  return {
    success: true,
    data: generalData.contactPage
  };
}