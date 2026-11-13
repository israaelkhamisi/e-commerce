import { notFound } from "next/navigation";

// Catches every unknown URL like /en/deals and shows our 404 page
export default function CatchAllPage() {
  notFound();
}
