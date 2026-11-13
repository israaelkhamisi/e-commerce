// Downloads the Home page icons/images exported from the FreshCart Figma file
// into public/. Run once from the project root: node scripts/download-figma-assets.mjs
// (Figma asset links expire 7 days after export: 2026-10-29)
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const base = "https://www.figma.com/api/mcp/asset/";

const assets = {
  // brand
  "images/freshcart-logo.svg": "5c78e919-78b3-4277-80f0-06cc7b58a197.svg",
  "images/footer-logo.svg": "58fe36d4-a640-42f5-a6b4-e5b2284ee85c.svg",
  // home hero
  "images/home/hero.png": "79b06b8c-5e3d-46d6-9fc3-0597fbaeeedb.png",
  // top bar
  "icons/topbar/truck.svg": "b6cac34b-dfbb-46aa-b929-b7c6f8b8efff.svg",
  "icons/topbar/gift.svg": "84a30e8c-017a-415d-ad62-f4b7fc19b534.svg",
  "icons/topbar/phone.svg": "525898fe-5aa5-476f-8b3f-3975466608e5.svg",
  "icons/topbar/envelope.svg": "2db2544d-bb5d-454f-8f34-d1c567e512a8.svg",
  "icons/topbar/user.svg": "c3f74365-8b08-457c-a13b-260e00a05663.svg",
  "icons/topbar/sign-out.svg": "007c0b4e-03db-4f07-b6e7-0b083fde345e.svg",
  // header
  "icons/header/search.svg": "765fcb4f-dde8-48f2-b0e9-13098cf8ba70.svg",
  "icons/header/chevron-down.svg": "cd05ced9-e3af-4c09-b7e0-adffb0b7fc82.svg",
  "icons/header/headset.svg": "e1a82660-8622-4021-b7b9-ca6b99d0f732.svg",
  "icons/header/heart.svg": "ddadc9f5-1fa6-48e4-9fd0-151973d21790.svg",
  "icons/header/cart.svg": "6e9198d9-c51c-4046-aa41-a777f9f8585b.svg",
  "icons/header/account.svg": "0679ac00-da88-45bc-8a35-fa0b87b29e53.svg",
  // hero slider arrows
  "icons/home/slider-prev.svg": "cf4fbcde-197e-40ff-b4fc-2e2adb9b5c7f.svg",
  "icons/home/slider-next.svg": "c21113c7-cccb-466c-a1e2-54b3f7a91735.svg",
  // services bar (under hero)
  "icons/home/service-shipping.svg": "59d100c7-cdad-420b-a47f-c499ae1ba58b.svg",
  "icons/home/service-payment.svg": "c033f0b3-b09c-457c-a4e5-5c866b5e267c.svg",
  "icons/home/service-returns.svg": "aefd5d2b-d18f-4163-acfe-9e83f87cf647.svg",
  "icons/home/service-support.svg": "a67c38d2-a3c5-43e1-a107-f221bc6e995e.svg",
  // section links / promo banners
  "icons/home/arrow-right-green.svg": "2054584a-9ffd-4a7a-9c14-b8e2b0aae728.svg",
  "icons/home/promo-arrow-emerald.svg": "9be6f820-f53a-477e-9a27-af14a6afed0f.svg",
  "icons/home/promo-arrow-orange.svg": "b85c67ec-fa45-43bf-b0ac-839627c95133.svg",
  // product card
  "icons/product/heart.svg": "4e45f600-15ec-49a0-b3ab-b113e9ffd6ea.svg",
  "icons/product/compare.svg": "524bacc9-95c6-4275-9b32-8f32527248e1.svg",
  "icons/product/eye.svg": "5f222ea7-184e-4bad-add8-4387acbe577f.svg",
  "icons/product/star-full.svg": "65787bfa-f7fe-441e-9930-d540d72c789f.svg",
  "icons/product/star-empty.svg": "178491d7-21d6-4bad-91c0-52dc215a62d6.svg",
  "icons/product/plus.svg": "81e6cb74-1574-47c5-ae70-fee89201965f.svg",
  // newsletter + app card
  "icons/home/newsletter-envelope.svg": "c191967a-0cce-4b91-acf7-537f9bfb0fb7.svg",
  "icons/home/perk-leaf.svg": "0b2917ac-6578-4570-8100-da1b5384e485.svg",
  "icons/home/perk-truck.svg": "b3b53b35-a516-4c8f-9726-0aeed4d9a01d.svg",
  "icons/home/perk-tag.svg": "3c85ad45-b1f9-4dc0-9f2a-29a61032bb4e.svg",
  "icons/home/subscribe-arrow.svg": "26588272-a9ce-4db2-9333-0a36fcd4c208.svg",
  "icons/home/apple.svg": "bbede748-877a-4c59-bf60-797e7de238ab.svg",
  "icons/home/google-play.svg": "ddc96cd6-a883-4b16-a67d-d685e1a72114.svg",
  // features strip (above footer)
  "icons/features/shipping.svg": "dbc2fd7f-76dc-47ee-84c8-9bdcb0c38c37.svg",
  "icons/features/returns.svg": "acc5dccc-d7f7-45a0-8785-fcc4d5eafc75.svg",
  "icons/features/payment.svg": "6933151e-e484-4171-9ffa-94af7d87d446.svg",
  "icons/features/support.svg": "c4cf138c-24b2-4f35-9d8e-693e02fab5f0.svg",
  // footer
  "icons/footer/phone.svg": "a7588592-d368-4061-9931-543885e4cd99.svg",
  "icons/footer/envelope.svg": "fd2f3779-ef21-46fc-b7b4-59bf155cb5a8.svg",
  "icons/footer/map-pin.svg": "9d56bf7c-2e79-47fc-be9d-1a430ee8db6b.svg",
  "icons/footer/facebook.svg": "3d3cf081-d222-4ab0-9369-505fc13572ba.svg",
  "icons/footer/twitter.svg": "96ee27b5-baa3-4534-bf80-2d6b38be63e4.svg",
  "icons/footer/instagram.svg": "a7487754-9860-4ac6-afee-51e86d892389.svg",
  "icons/footer/youtube.svg": "9f3511cd-2e5e-4807-8243-099f06703ac6.svg",
  "icons/footer/credit-card.svg": "7b0a503b-3842-48bd-8215-4a624dda093d.svg",
};

let failed = 0;
for (const [path, id] of Object.entries(assets)) {
  const target = join("public", path);
  try {
    const res = await fetch(base + id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length === 0) throw new Error("empty file");
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, bytes);
    console.log(`ok   ${target} (${bytes.length} bytes)`);
  } catch (error) {
    failed++;
    console.error(`FAIL ${target}: ${error.message}`);
  }
}

console.log(failed ? `\n${failed} file(s) failed` : "\nAll assets downloaded");
process.exitCode = failed ? 1 : 0;
