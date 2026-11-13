// Downloads the Sign In / Sign Up icons and images exported from the FreshCart Figma file
// into public/. Run once from the project root: node scripts/download-auth-assets.mjs
// (Figma asset links expire 7 days after export: 2026-10-31)
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const base = "https://www.figma.com/api/mcp/asset/";

const assets = {
  // login side panel
  "images/auth/login-cart.png": "28f30880-8251-46c6-84f0-814b8de58d33.png",
  "icons/auth/truck.svg": "f4c94781-c20d-4d92-a1e8-4f31bf788d43.svg",
  "icons/auth/shield.svg": "f4ecbc40-2b8f-4ec6-872c-05c0f5f18e2f.svg",
  "icons/auth/clock.svg": "98bc3c17-a069-4be1-a616-dfb8452a530c.svg",
  // login card
  "icons/auth/google.svg": "41e80a38-b168-4a34-ae56-9250f2943b61.svg",
  "icons/auth/facebook.svg": "75f009dc-0ae9-4c2e-9474-38cf7338388d.svg",
  "icons/auth/envelope.svg": "c1cd5690-662b-4515-a0e8-6b348034f544.svg",
  "icons/auth/lock.svg": "8ad3922b-091b-4536-b16e-5fbdb5fb990c.svg",
  "icons/auth/eye.svg": "93d418e9-ad9f-40fb-80dd-fb021b2c274f.svg",
  "icons/auth/lock-small.svg": "4ee1fdb7-b5e0-4626-a934-e15711591f20.svg",
  "icons/auth/users.svg": "fe3bd9fb-5416-49ae-a61e-5783db59dbb5.svg",
  "icons/auth/star-gray.svg": "08db467e-515d-45be-8b0a-c901644d8ae1.svg",
  // register side panel
  "icons/auth/feature-star.svg": "a219e0f1-8f69-456c-a656-4f1fa758c55f.svg",
  "icons/auth/feature-truck.svg": "134a4e25-8076-4a2b-bbe9-79b1fc51501d.svg",
  "icons/auth/feature-shield.svg": "27a07868-167f-4027-ab0e-c8e5ae8608cf.svg",
  "icons/auth/star-yellow.svg": "a0bef139-7337-44c8-9d88-8968999b19b8.svg",
  "images/auth/review-avatar.png": "488b187b-90fe-42f0-b4d9-fdbe4f593f6a.png",
  // register card
  "icons/auth/google-sm.svg": "c5cebd7d-5629-4da4-91b7-97da95b6e42c.svg",
  "icons/auth/facebook-sm.svg": "353b28da-e7ca-4e6d-b8c5-28fda481e1dc.svg",
  "icons/auth/user-plus.svg": "eb7cd8af-d30a-4048-909f-7b1df1e40308.svg",
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
