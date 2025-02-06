import sharp from "sharp";
import Dither from "canvas-dither";

const BW_THRESHOLD = 128;

export async function to1BitBW(image: RawImage, dither: boolean): Promise<RawBWImage> {
  const { width, height } = image;
  const rgbaImage: RawRGBAImage = await toRGBA(image);
  const { data } = dither ? Dither.atkinson(rgbaImage) : Dither.threshold(rgbaImage, BW_THRESHOLD);
  return { data, width, height, channels: 1 };
}

async function toRGBA(image: RawImage): Promise<RawRGBAImage> {
  const { data, width, height, channels } = image;
  const rgbaData: Buffer = await sharp(data, { raw: { width, height, channels } })
    .toColorspace("srgb")
    .ensureAlpha()
    .raw()
    .toBuffer();
  return { data: rgbaData, width, height, channels: 4 };
}
