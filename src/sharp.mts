import sharp from "sharp";
import Dither from "canvas-dither";
import { encode as bmpEncode, BmpCompression } from "bmp-ts";

type RawImage = {
  width: number;
  height: number;
  channels: 1 | 2 | 3 | 4;
  data: Uint8Array;
};

export async function ditherImage(image: RawImage): Promise<RawImage> {
  const rgbaImage: RawImage = await toRGBA(image);
  const dithered: RawImage = Dither.atkinson(rgbaImage);
  return { data: dithered.data, width: image.width, height: image.height, channels: 1 };
}

export async function toRGBA(image: RawImage): Promise<RawImage> {
  const data: Uint8Array = await sharp(image.data, {
    raw: {
      width: image.width,
      height: image.height,
      channels: image.channels,
    },
  })
    .toColorspace("srgb")
    .ensureAlpha()
    .raw()
    .toBuffer();
  return { data, width: image.width, height: image.height, channels: 4 };
}

export function encodeBmp(image: RawImage): Uint8Array {
  const { data } = bmpEncode({
    data: Buffer.from(image.data),
    width: image.width,
    height: image.height,
    bitPP: 1,
    compression: BmpCompression.NONE,
  });
  return data;
}

export async function readImage(path: string): Promise<RawImage> {
  const { data, info } = await sharp(path).raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}
