import sharp, { type Sharp } from "sharp";
import { to1Bit } from "./conversions.mjs";

type DrawImageOptions = { image: RawImage; top: number; left: number; dither: boolean };
type DrawSvgOptions = { svg: string; top: number; left: number };

export class ImageBuffer {
  private buffer: Sharp;
  private width: number;
  private height: number;

  constructor({ width, height }: { width: number; height: number }) {
    this.buffer = sharp({ raw: { width, height, channels: 1 } });
    this.width = width;
    this.height = height;
  }

  drawSvg({ svg, top, left }: DrawSvgOptions): void {
    this.buffer = this.buffer.composite([{ input: Buffer.from(svg), top, left }]);
  }

  async drawImage({ image, top, left, dither }: DrawImageOptions): Promise<void> {
    const { data, width, height }: RawBWImage = await to1Bit(image, dither);
    this.buffer = this.buffer.composite([{ input: data, raw: { width, height, channels: 1 }, top, left }]);
  }

  async toRawImage(): Promise<RawBWImage> {
    const { buffer, width, height } = this;
    const data: Buffer = await buffer.raw().toBuffer();
    return { data, width, height, channels: 1 };
  }
}
