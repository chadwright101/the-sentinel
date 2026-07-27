import { buildShowcaseResponse } from "@/_lib/utils/showcase-feed-handler";

export const revalidate = 300;

export async function GET() {
  return buildShowcaseResponse("pm");
}
