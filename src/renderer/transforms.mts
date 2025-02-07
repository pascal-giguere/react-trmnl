import sharp from "sharp";
import { atkinsonDither } from "./dithering.mjs";

export async function oneBit(image: RawImage, dither: boolean): Promise<RawBWImage> {
  const bwImage: RawBWImage = await grayscale(image);
  const { data: dithered } = dither ? atkinsonDither(bwImage) : threshold(bwImage, 128);
  const { width, height } = image;
  return { data: dithered, width, height, channels: 1 };
}

async function grayscale(image: RawImage): Promise<RawBWImage> {
  const iSBWImage = (image: RawImage): image is RawBWImage => image.channels === 1;
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

function threshold(image: RawBWImage, threshold: number): RawBWImage {
  const data = Buffer.from(image.data.map((value) => (value < threshold ? 0 : 255)));
  return { ...image, data };
}
