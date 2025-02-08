import sharp from "sharp";
import fs from "node:fs";
import { encodeBMP, encodePNG } from "./encoding.mjs";
import { ImageBuffer } from "./compositing.mjs";
import { Dithering } from "./dithering.mjs";
import type { RawImage, RawBWImage } from "./types.mjs";

async function readImage(path: string): Promise<RawImage> {
  const { data, info } = await sharp(path).raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}

export async function testCompositing(): Promise<void> {
  const inputImage = await readImage("in/rover_rgb.jpg");

  console.time("testCompositing");
  const imageBuffer = new ImageBuffer({ width: 800, height: 480 });

  await imageBuffer.drawSvg({
    svg: "<circle r='100' cx='100' cy='100' fill='black' />",
    dimensions: { width: 200, height: 200 },
    position: { top: 50, left: 50 },
  });

  await imageBuffer.drawSvg({
    svg: "<rect width='200' height='100' fill='black' />",
    dimensions: { width: 200, height: 100 },
    position: { top: 150, left: 300 },
  });

  await imageBuffer.drawImage({
    image: inputImage,
    dimensions: { width: 300, height: 180 },
    position: { top: 280, left: 420 },
    dithering: Dithering.Atkinson,
  });

  await imageBuffer.drawText({
    text: "My cat is grumpy",
    dimensions: { width: 500, height: 100 },
    position: { top: 300, left: 50 },
    fontSize: 50,
    fontFamily: "monospace",
    stroke: "white",
  });

  const rawImage: RawBWImage = imageBuffer.toRawImage();
  const pngImage = await encodePNG(rawImage);
  fs.writeFileSync("out/compositing.png", pngImage);
  const bmpImage = encodeBMP(rawImage);
  fs.writeFileSync("out/compositing.bmp", bmpImage);
  console.timeEnd("testCompositing");
}
