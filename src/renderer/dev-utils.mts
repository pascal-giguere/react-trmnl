// process.env.FC_DEBUG = "1024";
import { readImage } from "./filesystem.js";

process.env.PANGOCAIRO_BACKEND = "fontconfig";

import { join } from "node:path";
import { ImageBuffer } from "./compositing.mjs";
import { Dithering } from "./dithering.mjs";
import type { RawBWImage } from "./types.mjs";
import { VectorFont } from "./fonts.mjs";

const inputImage = await readImage(join(process.cwd(), "/assets/images/rover_rgb.jpg"));

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
