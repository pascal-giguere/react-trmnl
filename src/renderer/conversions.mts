import sharp from "sharp";
import { atkinson, threshold } from "./dithering.mjs";

const BW_THRESHOLD = 128;

export async function to1Bit(image: RawImage, dither: boolean): Promise<RawBWImage> {
  const bwImage: RawBWImage = await toBW(image);
  const { data: dithered } = dither ? atkinson(bwImage) : threshold(bwImage, BW_THRESHOLD);
  const { width, height } = image;
  const ditheredImage: RawImage = { data: dithered, width, height, channels: 1 };
  return toBW(ditheredImage);
}

async function toBW(image: RawImage): Promise<RawBWImage> {
  if (iSBWImage(image)) {
    return image;
  }
  const { data, width, height, channels } = image;
  const bwData: Buffer = await sharp(data, { raw: { width, height, channels } })
    .toColorspace("b-w")
    .removeAlpha()
    .raw()
    .toBuffer();
  return { data: bwData, width, height, channels: 1 };
}

function iSBWImage(image: RawImage): image is RawBWImage {
  return image.channels === 1;
}
