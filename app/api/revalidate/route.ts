import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    revalidateTag("wordpress", { expire: 0 });
    revalidateTag("calameo", { expire: 0 });
    return NextResponse.json({ revalidated: true, message: "Site successfully refreshed!" });
  } catch (error) {
    return NextResponse.json({ revalidated: false, error: String(error) }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head><title>Error</title></head>
<body style="font-family: system-ui; padding: 2rem; text-align: center;">
  <h1 style="color: #dc2626;">❌ Invalid Secret</h1>
  <p>The revalidation secret is incorrect.</p>
</body>
</html>`,
      { status: 401, headers: { "Content-Type": "text/html" } }
    );
  }

  try {
    revalidateTag("wordpress", { expire: 0 });
    revalidateTag("calameo", { expire: 0 });
    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head><title>Success</title></head>
<body style="font-family: system-ui; padding: 2rem; text-align: center;">
  <h1 style="color: #16a34a;">✅ Site Refreshed!</h1>
  <p>The Sentinel website has been successfully revalidated.</p>
  <p style="color: #6b7280; font-size: 0.875rem; margin-top: 2rem;">You can close this window.</p>
</body>
</html>`,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head><title>Error</title></head>
<body style="font-family: system-ui; padding: 2rem; text-align: center;">
  <h1 style="color: #dc2626;">❌ Error</h1>
  <p>Failed to revalidate: ${String(error)}</p>
</body>
</html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
