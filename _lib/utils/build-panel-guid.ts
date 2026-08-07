import { createHash } from "node:crypto";

export default function buildPanelGuid(prefix: string, urls: string[]): string {
  const digest = createHash("sha1")
    .update([prefix, ...urls].join("\n"))
    .digest("hex");

  const uuid = [
    digest.slice(0, 8),
    digest.slice(8, 12),
    digest.slice(12, 16),
    digest.slice(16, 20),
    digest.slice(20, 32),
  ].join("-");

  return `urn:uuid:${uuid}`;
}
