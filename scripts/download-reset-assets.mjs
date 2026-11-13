// Downloads the Forgot / Verify code / Reset password icons exported from the FreshCart Figma file
// into public/icons/reset. Run once from the project root: node scripts/download-reset-assets.mjs
// (Figma asset links expire 7 days after export: 2026-11-09)
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const base = "https://www.figma.com/api/mcp/asset/";

const assets = {
  // side panel
  "icons/reset/side-lock.svg": "3d4787e1-35b1-4d4b-8e3d-a7af58447a68.svg",
  "icons/reset/side-envelope.svg": "fddea627-2f4e-49a3-a21c-e7944341c2fb.svg",
  "icons/reset/side-shield.svg": "f1518ffe-6113-462e-b31a-b0dd30a85663.svg",
  "icons/reset/badge-envelope.svg": "7dcaf23c-7178-47cb-ac4c-5ad1904474f5.svg",
  "icons/reset/badge-shield.svg": "bd1fca97-db9f-440b-8b25-8847a6316a66.svg",
  "icons/reset/badge-lock.svg": "8780317a-de6e-4aed-ac90-1ab0e92ae5f8.svg",
  // steps
  "icons/reset/step-envelope.svg": "bcc94e9a-0eba-4a08-850e-5944969448a8.svg",
  "icons/reset/step-key-gray.svg": "4c39f61f-9c8c-4db8-bdad-6908b5c70930.svg",
  "icons/reset/step-lock-gray.svg": "a991e854-77cb-4adc-a8cf-1bceeef91643.svg",
  "icons/reset/step-check.svg": "895f08c8-0ca9-4f26-a97d-e15b25b345ba.svg",
  "icons/reset/step-key.svg": "70d2883e-0780-4afc-bb0c-6b3b082abbba.svg",
  "icons/reset/step-lock.svg": "671d87d5-0d40-49cf-8305-7f5d9f739386.svg",
  // forms
  "icons/reset/code-shield.svg": "4cf6f5b6-728a-458a-9937-c0c4e5a3f7bd.svg",
  "icons/reset/arrow-left-green.svg": "e21918f5-bd36-480e-8927-594320d37e10.svg",
  "icons/reset/arrow-left-gray.svg": "07abb396-343e-4cd1-b295-437b476f0414.svg",
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
