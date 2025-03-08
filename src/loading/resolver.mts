import type { RawImage } from "../rendering/types.mjs";
import { fetchImage } from "./network.mjs";
import { readImage } from "./filesystem.mjs";

export async function resolveImage(src: string): Promise<RawImage> {
  if (src.startsWith("http")) {
    return fetchImage(src);
  }
  return readImage(src);
}
