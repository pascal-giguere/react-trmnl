import type { TextStyle } from "../styling/types.mjs";
import type { LayoutProps } from "../layout/types.mjs";
import type { NodeContent, TextContent, SvgContent, ImageContent } from "./types.mjs";
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
}

export class ReconcilerTextNode extends ReconcilerNode {
  content: TextContent;
  style: TextStyle;

  constructor(text: string, layout: LayoutProps, style: TextStyle) {
    super(layout);
    this.content = { text };
    this.style = style;
  }

  override async draw(buffer: ImageBuffer): Promise<void> {
    await buffer.drawText({
      text: this.content.text,
      dimensions: this.layout.dimensions,
      position: this.layout.position,
    });
  }
}

export class ReconcilerSvgNode extends ReconcilerNode {
  content: SvgContent;

  constructor(svg: string, layout: LayoutProps) {
    super(layout);
    this.content = { svg };
  }

  override async draw(buffer: ImageBuffer): Promise<void> {
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

  override async draw(buffer: ImageBuffer): Promise<void> {
    await buffer.drawImage({
      image: this.content.image,
      dimensions: this.layout.dimensions,
      position: this.layout.position,
      dithering: this.content.dithering,
    });
  }
}
