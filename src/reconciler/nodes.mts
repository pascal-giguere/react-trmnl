import type { LayoutProps } from "../layout/types.mjs";
import type { NodeContent, SvgContent, ImageContent, TextProps, BoxProps, ImageProps, NoopContent } from "./types.mjs";
import type { RawImage } from "../renderer/types.mjs";
import type { Dithering } from "../renderer/dithering.mjs";
import type { ImageBuffer } from "../renderer/compositing.mjs";

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

  clearChildren(): void {
    this.children = [];
  }
}

export class ReconcilerSvgNode extends ReconcilerNode {
  content: SvgContent;

  constructor(svg: string, layout: LayoutProps) {
    super(layout);
    this.content = { svg };
  }

  static fromTextProps(props: TextProps): ReconcilerSvgNode {
    const svg =
      `<text` +
      ` fill="${props.color}"` +
      ` font-size="${props.fontSize}"` +
      ` font-family="${props.fontFamily}"` +
      ` stroke="${props.borderColor}"` +
      ` stroke-width="${props.borderWidth}"` +
      ` paint-order="stroke"` +
      `>` +
      `${props.children}` +
      `</text>`;
    return new ReconcilerSvgNode(svg, {
      position: { top: props.top, left: props.left },
      dimensions: { width: props.width, height: props.height },
    });
  }

  static fromBoxProps(props: BoxProps): ReconcilerSvgNode {
    const svg =
      `<rect` +
      ` width="${props.width}"` +
      ` height="${props.height}"` +
      ` fill="${props.backgroundColor}"` +
      ` rx="${props.borderRadius}"` +
      ` ry="${props.borderRadius}"` +
      ` stroke="${props.borderColor}"` +
      ` stroke-width="${props.borderWidth}"` +
      ` />`;
    return new ReconcilerSvgNode(svg, {
      position: { top: props.top, left: props.left },
      dimensions: { width: props.width, height: props.height },
    });
  }

  override async draw(buffer: ImageBuffer): Promise<void> {
    console.log(this.content.svg);
    await buffer.drawSvg({
      svg: this.content.svg,
      dimensions: this.layout.dimensions,
      position: this.layout.position,
    });
  }
}

export class ReconcilerImageNode extends ReconcilerNode {
  content: ImageContent;

  constructor(image: RawImage, dithering: Dithering, layout: LayoutProps) {
    super(layout);
    this.content = { image, dithering };
  }

  static fromImageProps(props: ImageProps): ReconcilerImageNode {
    // TODO: Implement image creation
    const image: RawImage = { data: Buffer.alloc(0), width: 0, height: 0, channels: 1 };
    return new ReconcilerImageNode(image, props.dithering, {
      position: { top: props.top, left: props.left },
      dimensions: { width: props.width, height: props.height },
    });
  }

  override async draw(buffer: ImageBuffer): Promise<void> {
    await buffer.drawImage({
      image: this.content.image,
      dimensions: this.layout.dimensions,
      position: this.layout.position,
      dithering: this.content.dithering,
    });
  }
}

export class ReconcilerNoopNode extends ReconcilerNode {
  content: NoopContent;

  constructor() {
    super({ position: { top: 0, left: 0 }, dimensions: { width: 0, height: 0 } });
  }

  override async draw(_buffer: ImageBuffer): Promise<void> {}
}
