import { handleGetProduct } from "src/services/api";
import FeaturedProducts from "./FeaturedProducts";

export default async function HomeProducts() {
  const products = await handleGetProduct();
  return <FeaturedProducts products={products} />;
}