import sharp from "sharp";
import { ditherImage, Dithering } from "./dithering.mjs";

type DrawImageOptions = {
  image: RawImage;
  width: number;
  height: number;
  top: number;
  left: number;
  dithering: Dithering;
};
type DrawSvgOptions = { svg: string; top: number; left: number };

export class ImageBuffer {
  readonly width: number;
  readonly height: number;
  private data: Buffer;

  constructor({ width, height }: { width: number; height: number }) {
    this.width = width;
    this.height = height;
    this.data = Buffer.alloc(width * height).fill(255);
  }

  async drawSvg({ svg, top, left }: DrawSvgOptions): Promise<void> {
    const { data: svgData, info: svgInfo } = await sharp(Buffer.from(svg)).raw().toBuffer({ resolveWithObject: true });

    this.data = Buffer.from(
      (
        await sharp(this.data, { raw: { width: this.width, height: this.height, channels: 1 } })
          .composite([
            { input: svgData, raw: { width: svgInfo.width, height: svgInfo.height, channels: 4 }, top, left },
          ])
          .toColourspace("b-w")
          .toBuffer()
      ).map((value) => (value < 128 ? 0 : 255)),
    );
  }

  async drawImage({ image, width, height, top, left, dithering = Dithering.None }: DrawImageOptions): Promise<void> {
    const resizedData: Buffer = await sharp(image.data, {
      raw: { width: image.width, height: image.height, channels: image.channels },
    })
      .resize(width, height)
      .toColourspace("b-w")
      .toBuffer();
    const resizedImage: RawBWImage = { data: resizedData, width, height, channels: 1 };
    const { data }: RawBWImage = ditherImage(resizedImage, dithering);

    this.data = await sharp(this.data, { raw: { width: this.width, height: this.height, channels: 1 } })
      .composite([{ input: data, raw: { width, height, channels: 1 }, top, left }])
      .toColourspace("b-w")
      .toBuffer();
  }

  toRawImage(): RawBWImage {
    const { data, width, height } = this;
    return { data, width, height, channels: 1 };
  }
}
