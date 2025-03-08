import { resolveImage } from "../loading/resolver.mjs";
import type { LayoutProps } from "../layout/types.mjs";
import type { NodeContent, SvgContent, ImageContent, TextProps, BoxProps, ImageProps, NoopContent } from "./types.mjs";
import type { RawImage } from ".././rendering/types.mjs";
import type { Dithering } from ".././rendering/dithering.mjs";
import type { ImageBuffer } from ".././rendering/compositing.mjs";

export abstract class ReconcilerNode {
  abstract content: NodeContent;
  children: ReconcilerNode[] = [];
  layout: LayoutProps;

  protected constructor(layout: LayoutProps) {
    this.layout = layout;
  }

  abstract draw(buffer: ImageBuffer): Promise<void>;

  appendChild(child: ReconcilerNode): void {
    this.children.push(child);
  }

  removeChild(child: ReconcilerNode): void {
    this.children = this.children.filter((c) => c !== child);
  }

  insertBefore(child: ReconcilerNode, beforeChild: ReconcilerNode): void {
    const index = this.children.indexOf(beforeChild);
    if (index === -1) {
      throw new Error("Child not found");
    }
    this.children.splice(index, 0, child);
  }
}

export class ReconcilerSvgNode extends ReconcilerNode {
  content: SvgContent;

  constructor(svg: string, layout: LayoutProps) {
    super(layout);
    this.content = { svg };
  }

  static fromTextProps({
    children,
    width,
    height,
    top,
    left,
    color,
    fontSize,
    fontFamily,
    borderColor,
    borderWidth,
  }: TextProps): ReconcilerSvgNode {
    const svg =
      `<text` +
      ` fill="${color}"` +
      ` font-size="${fontSize}"` +
      ` y="${fontSize}"` +
      ` font-family="${fontFamily}"` +
      ` stroke="${borderColor}"` +
      ` stroke-width="${borderWidth * 2}"` +
      ` paint-order="stroke"` +
      `>` +
      `${children}` +
      `</text>`;
    return new ReconcilerSvgNode(svg, { dimensions: { width, height }, position: { top, left } });
  }

  static fromBoxProps({
    width,
    height,
    top,
    left,
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
  }: BoxProps): ReconcilerSvgNode {
    const svg =
      `<rect` +
      ` width="${width - borderWidth}"` +
      ` height="${height - borderWidth}"` +
      ` x="${borderWidth / 2}"` +
      ` y="${borderWidth / 2}"` +
      ` fill="${backgroundColor}"` +
      ` rx="${borderRadius}"` +
      ` ry="${borderRadius}"` +
      ` stroke="${borderColor}"` +
      ` stroke-width="${borderWidth}"` +
      ` />`;
    return new ReconcilerSvgNode(svg, { dimensions: { width, height }, position: { top, left } });
  }

  override async draw(buffer: ImageBuffer): Promise<void> {
    const { dimensions, position } = this.layout;
    const { svg } = this.content;
    console.log(svg);
    await buffer.drawSvg({ svg, dimensions, position });
  }
}

export class ReconcilerImageNode extends ReconcilerNode {
  content: ImageContent;

  constructor(src: string, dithering: Dithering, layout: LayoutProps) {
    super(layout);
    this.content = { src, dithering };
  }

  static fromImageProps({ src, width, height, top, left, dithering }: ImageProps): ReconcilerImageNode {
    return new ReconcilerImageNode(src, dithering, { dimensions: { width, height }, position: { top, left } });
  }

  override async draw(buffer: ImageBuffer): Promise<void> {
    const { dimensions, position } = this.layout;
    const { src, dithering } = this.content;
    // TODO Implement image cache
    const image: RawImage = await resolveImage(src);
    await buffer.drawImage({ image, dimensions, position, dithering });
  }
}

export class ReconcilerNoopNode extends ReconcilerNode {
  content: NoopContent;

  constructor() {
    super({ dimensions: { width: 0, height: 0 }, position: { top: 0, left: 0 } });
  }

  override async draw(_buffer: ImageBuffer): Promise<void> {}
}
