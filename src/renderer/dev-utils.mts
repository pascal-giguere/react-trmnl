import sharp from "sharp";
import { encodeBMP, encodePNG } from "./encoding.mjs";
import fs from "node:fs";
import { ImageBuffer } from "./compositing.mjs";
import { Dithering } from "./dithering.mjs";

async function readImage(path: string): Promise<RawImage> {
  const { data, info } = await sharp(path).raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}

export async function testCompositing(): Promise<void> {
  const inputImage = await readImage("in/rover_rgb.jpg");

  console.time("testCompositing");
  const imageBuffer = new ImageBuffer({ width: 800, height: 480 });
  await imageBuffer.drawImage({
    image: inputImage,
    width: 200,
    height: 120,
    top: 0,
    left: 0,
    dithering: Dithering.Atkinson,
  });

  await imageBuffer.drawSvg({
    svg: "<svg><circle r='100' cx='100' cy='100' fill='red' /></svg>",
    top: 50,
    left: 50,
  });

  const rawImage: RawBWImage = imageBuffer.toRawImage();
  const pngImage = await encodePNG(rawImage);
  fs.writeFileSync("out/compositing.png", pngImage);
  const bmpImage = encodeBMP(rawImage);
  fs.writeFileSync("out/compositing.bmp", bmpImage);
  console.timeEnd("testCompositing");
}
