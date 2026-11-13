// Downloads the My Account / Settings icons exported from the FreshCart Figma file
// into public/icons/account. Run once from the project root: node scripts/download-account-assets.mjs
// (Figma asset links expire 7 days after export: 2026-11-09)
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const base = "https://www.figma.com/api/mcp/asset/";

const assets = {
  // sidebar
  "icons/account/pin.svg": "688131c2-af11-48fe-a356-4b2443a76aec.svg",
  "icons/account/pin-white.svg": "d12e30a1-fe33-44ec-8552-682b5807468b.svg",
  "icons/account/gear.svg": "b150418e-0136-41b2-8f48-208b245027ae.svg",
  "icons/account/gear-white.svg": "6b98913d-81c4-4749-a425-41d3c592032c.svg",
  "icons/account/chevron.svg": "aa5b4ff1-1f2a-450d-bf23-f3c59e5bc597.svg",
  "icons/account/chevron-green.svg": "910df50a-259d-4ab0-87bf-b25c42725941.svg",
  // settings cards
  "icons/account/user.svg": "2cb146c1-f7c5-4545-90e8-db22caf11e38.svg",
  "icons/account/save.svg": "6fd95283-9e32-4b74-9c4e-aa3f98123520.svg",
  "icons/account/lock-orange.svg": "0931294c-a7c5-4db3-bc11-6fce535fb8fe.svg",
  "icons/account/lock-white.svg": "84f19bd4-ac61-4c1f-bca6-bb5676ab9109.svg",
  "icons/account/eye.svg": "fd4c0abf-1a8f-444a-8e2b-4c499242d45d.svg",
};

for (const [file, id] of Object.entries(assets)) {
  const target = join("public", file);
  const res = await fetch(base + id);
  if (!res.ok) {
    console.error(`✗ ${file} (${res.status})`);
    continue;
  }
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${file}`);
}
