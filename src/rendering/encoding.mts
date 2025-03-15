import { encode as bmpEncode } from "fast-bmp";
import sharp from "sharp";
import type { RawBWImage } from "./types.mjs";
import { OutputImageFormat } from "./images.mjs";

export async function encodeImage(image: RawBWImage, format: OutputImageFormat): Promise<Buffer> {
  switch (format) {
    case OutputImageFormat.BMP:
      return encodeBMP(image);
    case OutputImageFormat.PNG:
      return encodePNG(image);
    case OutputImageFormat.Raw:
      return image.data;
  }
}

function encodeBMP(image: RawBWImage): Buffer {
  const { data, width, height } = image;
  const inputBits: Uint8Array = data.map((byte) => (byte < 128 ? 0 : 1));
  const inputBytes = new Uint8Array(Math.ceil((width * height) / 8));
  for (let i = 0; i < inputBits.length; i++) {
    inputBytes[Math.floor(i / 8)] |= inputBits[i] << (7 - (i % 8));
  }
  const outputBytes: Uint8Array = bmpEncode({
    width,
    height,
    data: inputBytes,
    bitDepth: 1,
    components: 1,
    channels: 1,
  });
  return Buffer.from(outputBytes);
}

async function encodePNG(image: RawBWImage): Promise<Buffer> {
  const { data, width, height } = image;
  const inputBytes: Uint8Array = data.map((byte) => (byte < 128 ? 0 : 255));
  return sharp(Buffer.from(inputBytes), {
    raw: { width, height, channels: 1 },
  })
    .png({ colours: 2 })
    .toBuffer();
}
