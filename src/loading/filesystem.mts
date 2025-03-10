import { readFile } from "node:fs/promises";
import sharp from "sharp";
import type { RawBWImage } from "../rendering/types.mjs";

export async function readFileData(path: string): Promise<Buffer> {
  return readFile(path);
}

export async function readImage(path: string): Promise<RawBWImage> {
  const { data, info } = await sharp(path).toColourspace("b-w").raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: 1 };
}
