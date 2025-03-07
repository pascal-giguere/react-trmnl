import sharp from "sharp";
import type { RawImage } from "../rendering/types.mjs";
import { validateImageMimeType } from "../rendering/images.mjs";

export async function fetchData(url: string): Promise<{ bytes: Uint8Array; headers: Headers }> {
  const response: Response = await fetch(url);
  const { headers } = response;
  const blob: Blob = await response.blob();
  const bytes: Uint8Array = await blob.bytes();
  return { bytes, headers };
}

export async function fetchImage(url: string): Promise<RawImage> {
  const { bytes, headers } = await fetchData(url);
  const mimeType: string = headers.get("content-type") ?? "";
  validateImageMimeType(mimeType);
  const { data, info } = await sharp(bytes).raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}
