import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

async function purgeVercelEdgeCache(): Promise<boolean> {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) return false;

  const teamId = process.env.VERCEL_TEAM_ID;
  const params = new URLSearchParams({ projectIdOrName: projectId });
  if (teamId) params.set("teamId", teamId);

  const response = await fetch(
    `https://api.vercel.com/v1/edge-cache/invalidate-by-tags?${params.toString()}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: ["wordpress", "calameo"],
        target: "production",
      }),
    }
  );

  return response.ok;
}

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
    revalidateTag("wordpress", { expire: 0 });
    revalidateTag("calameo", { expire: 0 });
    revalidatePath("/", "layout");

    const edgePurged = await purgeVercelEdgeCache();

    const edgeStatus = edgePurged
      ? "CDN cache purged."
      : "CDN cache could not be purged (check Vercel API token).";

    return htmlResponse(
      "Success",
      "Site Refreshed!",
      `The Sentinel website has been revalidated. ${edgeStatus}`,
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
