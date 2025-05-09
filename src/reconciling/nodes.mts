import Yoga, { type Node as YogaNode } from "yoga-layout";
import { resolveImage } from "../loading/resolver.mjs";
import { applyYogaStyle, fromDisplayValue } from "../layout/style.mjs";
import { ImageBuffer } from ".././rendering/compositing.mjs";
import { inheritStyle } from "../styling/inheritance.mjs";
import type { LayoutResults, YogaStyle } from "../layout/types.mjs";
import type { RawBWImage, RawImage, RenderingDimensions, RenderingPosition } from ".././rendering/types.mjs";
import type { BoxStyle, ImageStyle, InheritedStyle, RootStyle, TextStyle } from "../styling/types.mjs";
import type { BoxProps, ImageProps, RootProps, TextProps } from "./types.mjs";

export abstract class ReconcilerNode {
  children: ReconcilerNode[] = [];
  yogaNode: YogaNode;

  protected constructor(style: YogaStyle) {
    const node: YogaNode = Yoga.Node.create();
    applyYogaStyle(node, style);
    this.yogaNode = node;
  }

  protected async drawRecursive(
    buffer: ImageBuffer,
    basePosition: RenderingPosition = { top: 0, left: 0 },
  ): Promise<void> {
    const { dimensions, position: layoutPosition, display }: LayoutResults = this.getComputedLayout();
    if (display === "none") return;

    const position: RenderingPosition = {
      top: basePosition.top + layoutPosition.top,
      left: basePosition.left + layoutPosition.left,
    };

    await this.drawNode(buffer, dimensions, position);

    const inheritedStyle: InheritedStyle | null = this.getInheritedStyle();
    for (const child of this.children) {
      if (inheritedStyle) {
        child.inheritStyle(inheritedStyle);
      }
      await child.drawRecursive(buffer, position);
    }
  }

  abstract drawNode(buffer: ImageBuffer, dimensions: RenderingDimensions, position: RenderingPosition): Promise<void>;

  abstract getInheritedStyle(): InheritedStyle | null;

  abstract inheritStyle(inheritedStyle: InheritedStyle): void;

  getComputedLayout(): LayoutResults {
    return {
      dimensions: {
        width: this.yogaNode.getComputedWidth(),
        height: this.yogaNode.getComputedHeight(),
      },
      position: {
        top: this.yogaNode.getComputedTop(),
        left: this.yogaNode.getComputedLeft(),
      },
      display: fromDisplayValue(this.yogaNode.getDisplay()),
    };
  }

  appendChild(child: ReconcilerNode): void {
    this.children.push(child);
    this.yogaNode.insertChild(child.yogaNode, this.yogaNode.getChildCount());
  }

  removeChild(child: ReconcilerNode): void {
    this.children = this.children.filter((c) => c !== child);
    this.yogaNode.removeChild(child.yogaNode);
  }

  insertBefore(child: ReconcilerNode, beforeChild: ReconcilerNode): void {
    const index = this.children.indexOf(beforeChild);
    if (index === -1) {
      throw new Error("Child not found");
    }
    this.children.splice(index, 0, child);
    this.yogaNode.insertChild(child.yogaNode, index);
  }
}

export class ReconcilerRootNode extends ReconcilerNode {
  private readonly rootStyle: RootStyle;

  constructor({ width, height, style }: RootProps) {
    const { color, fontFamily, fontSize, ...yogaStyle } = style;
    super({ ...yogaStyle, width, height });
    this.rootStyle = { color, fontFamily, fontSize };
  }

  override async drawNode(): Promise<void> {}

  override getInheritedStyle(): InheritedStyle {
    const { color, fontSize, fontFamily } = this.rootStyle;
    return { color, fontSize, fontFamily };
  }

  override inheritStyle(): void {}

  async drawTree(): Promise<RawBWImage> {
    this.yogaNode.calculateLayout("auto", "auto");
    const { dimensions }: LayoutResults = this.getComputedLayout();
    const buffer = new ImageBuffer(dimensions);
    await this.drawRecursive(buffer);
    this.yogaNode.freeRecursive();
    return buffer.toRawImage();
  }
}

export class ReconcilerTextNode extends ReconcilerNode {
  private readonly text: string;
  private textStyle: TextStyle;

  constructor({ children, style }: TextProps) {
    const { color, fontSize, fontFamily, borderColor, borderWidth, flex = 1, ...yogaStyle } = style;
    super({ ...yogaStyle, flex });
    this.text = children;
    this.textStyle = { color, fontSize, fontFamily, borderColor, borderWidth };
  }

  override async drawNode(
    buffer: ImageBuffer,
    dimensions: RenderingDimensions,
    position: RenderingPosition,
  ): Promise<void> {
    const { color, fontSize, fontFamily, borderColor, borderWidth } = this.textStyle;

    await buffer.drawText({
      text: this.text,
      dimensions,
      position,
      color,
      fontSize,
      font: fontFamily,
      borderColor,
      borderWidth,
    });
  }

  override async drawNodeOrig(
    buffer: ImageBuffer,
    dimensions: RenderingDimensions,
    position: RenderingPosition,
  ): Promise<void> {
    const { color, fontSize, fontFamily, borderColor, borderWidth } = this.textStyle;
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
      `${this.text}` +
      `</text>`;

    console.log(svg);
    await buffer.drawSvg({ svg, dimensions, position });
  }

  override getInheritedStyle(): null {
    return null;
  }

  override inheritStyle(inheritedStyle: InheritedStyle): void {
    this.textStyle = inheritStyle<TextStyle>(this.textStyle, inheritedStyle);
  }
}

export class ReconcilerBoxNode extends ReconcilerNode {
  private boxStyle: BoxStyle;

  constructor({ style }: BoxProps) {
    const { backgroundColor, borderColor, borderWidth, borderRadius, color, fontFamily, fontSize, ...yogaStyle } =
      style;
    super({ ...yogaStyle, borderWidth });
    this.boxStyle = { backgroundColor, borderColor, borderWidth, borderRadius, color, fontFamily, fontSize };
  }

  override async drawNode(
    buffer: ImageBuffer,
    dimensions: RenderingDimensions,
    position: RenderingPosition,
  ): Promise<void> {
    const { backgroundColor, borderColor, borderWidth, borderRadius } = this.boxStyle;
    const svg =
      `<rect` +
      ` width="${dimensions.width - borderWidth}"` +
      ` height="${dimensions.height - borderWidth}"` +
      ` x="${borderWidth / 2}"` +
      ` y="${borderWidth / 2}"` +
      ` fill="${backgroundColor}"` +
      ` rx="${borderRadius}"` +
      ` ry="${borderRadius}"` +
      ` stroke="${borderColor}"` +
      ` stroke-width="${borderWidth}"` +
      ` />`;

    console.log(svg);
    await buffer.drawSvg({ svg, dimensions, position });
  }

  override getInheritedStyle(): InheritedStyle {
    const { color, fontSize, fontFamily } = this.boxStyle;
    return { color, fontSize, fontFamily };
  }

  override inheritStyle(inheritedStyle: InheritedStyle): void {
    this.boxStyle = inheritStyle<BoxStyle>(this.boxStyle, inheritedStyle);
  }
}

export class ReconcilerImageNode extends ReconcilerNode {
  private readonly src: string;
  private readonly imageStyle: ImageStyle;

  constructor({ src, style }: ImageProps) {
    const { dithering, ...yogaStyle } = style;
    super(yogaStyle);
    this.src = src;
    this.imageStyle = { dithering };
  }

  override async drawNode(
    buffer: ImageBuffer,
    dimensions: RenderingDimensions,
    position: RenderingPosition,
  ): Promise<void> {
    const { dithering } = this.imageStyle;
    // TODO Implement image cache
    const image: RawImage = await resolveImage(this.src);
    await buffer.drawImage({ image, dimensions, position, dithering });
  }

  override getInheritedStyle(): null {
    return null;
  }

  override inheritStyle(): void {}
}

export class ReconcilerNoopNode extends ReconcilerNode {
  constructor() {
    super({});
  }

  override async drawNode(): Promise<void> {}

  override getInheritedStyle(): null {
    return null;
  }

  override inheritStyle(): void {}
}
