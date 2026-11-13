import type { IAddress } from "src/interfaces/address.interface";
import type { ApiResponse } from "src/types/api.types";

export async function getAddresses(): Promise<ApiResponse<IAddress[]>> {
  const res = await fetch("/api/addresses");
  return res.json();
}
