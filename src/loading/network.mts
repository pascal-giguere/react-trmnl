import sharp from "sharp";
import { validateImageMimeType } from "../rendering/images.mjs";
import type { RawBWImage } from "../rendering/types.mjs";

export async function fetchData(url: string): Promise<{ bytes: Uint8Array; headers: Headers }> {
  const response: Response = await fetch(url);
  const { headers } = response;
  const blob: Blob = await response.blob();
  const bytes: Uint8Array = await blob.bytes();
  return { bytes, headers };
}

export async function fetchImage(url: string): Promise<RawBWImage> {
  const { bytes, headers } = await fetchData(url);
  const mimeType: string = headers.get("content-type") ?? "";
  validateImageMimeType(mimeType);
  const { data, info } = await sharp(bytes).toColourspace("b-w").raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: 1 };
}
