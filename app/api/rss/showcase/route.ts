import { buildShowcasePanelResponse } from "@/_lib/utils/showcase-panel-handler";

export const revalidate = 300;

export async function GET() {
  return buildShowcasePanelResponse();
}
