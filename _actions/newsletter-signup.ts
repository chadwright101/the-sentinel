"use server";

interface NewsletterSignupResult {
  success: boolean;
  error?: string;
}

export async function newsletterSignUp(formData: FormData): Promise<NewsletterSignupResult> {
  try {
    const email = formData.get("email")?.toString();

    if (!email) {
      return {
        success: false,
        error: "Email address is required"
      };
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        error: "Please enter a valid email address"
      };
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

    if (!apiKey || !audienceId || !serverPrefix) {
      console.error("Missing Mailchimp environment variables");
      return {
        success: false,
        error: "Newsletter service is temporarily unavailable"
      };
    }

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed"
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 400 && errorData.title === "Member Exists") {
        return {
          success: false,
          error: "You're already subscribed to our newsletter"
        };
      }

      console.error("Mailchimp API error:", errorData);
      return {
        success: false,
        error: "Failed to subscribe to newsletter. Please try again."
      };
    }

    return {
      success: true
    };

  } catch (error) {
    console.error("Newsletter signup error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again."
    };
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}