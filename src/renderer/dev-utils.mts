// process.env.FC_DEBUG = "1024";
process.env.PANGOCAIRO_BACKEND = "fontconfig";

import { join } from "node:path";
import sharp from "sharp";
import { ImageBuffer } from "./compositing.mjs";
import { Dithering } from "./dithering.mjs";
import type { RawBWImage, RawImage } from "./types.mjs";
import { VectorFont } from "./fonts.mjs";

const inputImage = await readImage(join(process.cwd(), "/assets/images/rover_rgb.jpg"));

async function readImage(path: string): Promise<RawImage> {
  const { data, info } = await sharp(path).raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}

export async function testCompositing(imageBuffer: ImageBuffer): Promise<RawBWImage> {
  console.time("Compositing");

  await imageBuffer.drawSvg({
    svg: "<circle r='100' cx='100' cy='100' fill='black' />",
    dimensions: { width: 200, height: 200 },
    position: { top: 50, left: 50 },
  });

  await imageBuffer.drawSvg({
    svg: "<rect width='300' height='180' fill='black' />",
    dimensions: { width: 300, height: 180 },
    position: { top: 170, left: 430 },
  });

  await imageBuffer.drawImage({
    image: inputImage,
    dimensions: { width: 300, height: 180 },
    position: { top: 160, left: 420 },
    dithering: Dithering.Atkinson,
  });

  await imageBuffer.drawText({
    text: "My cat is grumpy",
    dimensions: { width: 500, height: 100 },
    position: { top: 297, left: 430 },
    fontSize: 28,
    fontFamily: VectorFont.EBGaramond,
    stroke: "white",
  });

  console.timeEnd("Compositing");

  return imageBuffer.toRawImage();
}
