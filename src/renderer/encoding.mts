import { encode as bmpEncode, BmpCompression } from "bmp-ts";
import sharp from "sharp";
import type { RawBWImage } from "./types.mjs";

export function encodeBMP(image: RawBWImage): Buffer {
  const { data, width, height } = image;
  const abgrData = Buffer.alloc(data.length * 4);
  for (let i = 0; i < data.length; i++) {
    abgrData[i * 4] = 255;
    abgrData[i * 4 + 1] = abgrData[i * 4 + 2] = abgrData[i * 4 + 3] = data[i];
  }
  const { data: out } = bmpEncode({
    data: abgrData,
    width,
    height,
    bitPP: 1,
    compression: BmpCompression.NONE,
  });
  return out;
}

export async function encodePNG(image: RawBWImage): Promise<Buffer> {
  const { data, width, height } = image;
  return sharp(data, {
    raw: { width, height, channels: 1 },
  })
    .png({ colours: 2 })
    .toBuffer();
}
