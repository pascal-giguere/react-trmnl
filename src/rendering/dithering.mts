import type { RawBWImage } from "./types.mjs";

export enum Dithering {
  None = "none",
  // FloydSteinberg = "floyd-steinberg",
  Atkinson = "atkinson",
}

export function ditherImage(image: RawBWImage, algorithm: Dithering): RawBWImage {
  switch (algorithm) {
    case Dithering.Atkinson:
      return atkinsonDither(image);
    default:
      return image;
  }
}

function atkinsonDither(image: RawBWImage): RawBWImage {
  const inData = Buffer.from(image.data);
  const outData = Buffer.alloc(image.data.length);
  for (let i = 0; i < inData.length; i++) {
    const value = inData[i] < 128 ? 0 : 255;
    const error = Math.floor((inData[i] - value) / 8);
    inData[i + 1] += error;
    inData[i + 2] += error;
    inData[i + image.width - 1] += error;
    inData[i + image.width] += error;
    inData[i + image.width + 1] += error;
    inData[i + 2 * image.width] += error;
    outData[i] = value;
  }
  return { ...image, data: outData };
}
