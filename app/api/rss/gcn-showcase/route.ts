import { buildGcnShowcasePanelResponse } from "@/_lib/utils/gcn-showcase-panel-handler";

export const revalidate = 300;

export async function GET() {
  return buildGcnShowcasePanelResponse();
}
