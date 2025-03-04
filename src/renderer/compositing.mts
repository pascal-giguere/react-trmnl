import sharp from "sharp";
import { ditherImage, Dithering } from "./dithering.mjs";
import { DefaultFont, VectorFont } from "./fonts.mjs";
import type { RawImage, RawBWImage, RenderingDimensions, RenderingPosition } from "./types.mjs";

type DrawTextOptions = {
  text: string;
  dimensions: RenderingDimensions;
  position?: RenderingPosition;
  fontSize?: number;
  fontFamily?: DefaultFont | VectorFont;
  fill?: "black" | "white";
  stroke?: "black" | "white" | "none";
  strokeWidth?: number;
};

type DrawImageOptions = {
  image: RawImage;
  dimensions: RenderingDimensions;
  position?: RenderingPosition;
  dithering?: Dithering;
};

type DrawSvgOptions = { svg: string; dimensions: RenderingDimensions; position?: RenderingPosition };

export class ImageBuffer {
  readonly width: number;
  readonly height: number;
  private data: Buffer;

  constructor({ width, height }: RenderingDimensions) {
    this.width = width;
    this.height = height;
    this.data = Buffer.alloc(width * height).fill(255);
  }

  async drawText({
    text,
    dimensions,
    position = {},
    fontSize = 24,
    fontFamily = DefaultFont.Sans,
    fill = "black",
    stroke = "none",
    strokeWidth = fontSize / 10,
  }: DrawTextOptions): Promise<void> {
    const svg =
      `<text y="${fontSize}" fill="${fill}" font-size="${fontSize}" font-family="${fontFamily}" ` +
      `stroke="${stroke}" stroke-width="${strokeWidth}" paint-order="stroke">${text}</text>`;
    await this.drawSvg({ svg, dimensions, position });
  }

  async drawSvg({ svg, dimensions, position = {} }: DrawSvgOptions): Promise<void> {
    const { width, height } = dimensions;
    const { top = 0, left = 0 } = position;
    if (width === 0 || height === 0) return;

    const { data: svgData, info: svgInfo } = await sharp(
      Buffer.from(`<svg width="${width}" height="${height}">${svg}</svg>`),
    )
      .raw()
      .toBuffer({ resolveWithObject: true });

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

  async drawImage({ image, dimensions, position = {}, dithering = Dithering.None }: DrawImageOptions): Promise<void> {
    const { width, height } = dimensions;
    const { top = 0, left = 0 } = position;
    if (width === 0 || height === 0) return;

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

  clear(): void {
    this.data.fill(255);
  }

  toRawImage(): RawBWImage {
    const { data, width, height } = this;
    return { data, width, height, channels: 1 };
  }
}
