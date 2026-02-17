import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

function htmlResponse(
  title: string,
  heading: string,
  message: string,
  status: number
) {
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head><title>${title}</title></head>
<body style="font-family: system-ui; padding: 2rem; text-align: center;">
  <h1>${heading}</h1>
  <p>${message}</p>
  <p style="color: #6b7280; font-size: 0.875rem; margin-top: 2rem;">You can close this tab.</p>
</body>
</html>`,
    { status, headers: { "Content-Type": "text/html" } }
  );
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return htmlResponse(
      "Error",
      "Invalid Secret",
      "The revalidation secret is incorrect.",
      401
    );
  }

  try {
    revalidatePath("/");

    return htmlResponse(
      "Success",
      "Site Refreshed!",
      "The Sentinel website has been revalidated.",
      200
    );
  } catch (error) {
    return htmlResponse(
      "Error",
      "Revalidation Failed",
      `Something went wrong: ${String(error)}`,
      500
    );
  }
}
