import { readFile } from "node:fs/promises";
import sharp from "sharp";
import type { RawImage } from "./types.mjs";

export async function readFileData(path: string): Promise<Buffer> {
  return readFile(path);
}

export async function readImage(path: string): Promise<RawImage> {
  const { data, info } = await sharp(path).raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}
