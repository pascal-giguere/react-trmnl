import Yoga, { Display, type Node as YogaNode } from "yoga-layout";
import { resolveImage } from "../loading/resolver.mjs";
import { applyYogaStyle } from "../layout/style.mjs";
import type { LayoutResults, YogaStyle } from "../layout/types.mjs";
import type { RawImage } from ".././rendering/types.mjs";
import type { ImageBuffer } from ".././rendering/compositing.mjs";
import type { BoxStyle, ImageStyle, TextStyle } from "../styling/types.mjs";
import type { BoxProps, ImageProps, TextProps } from "./types.mjs";

export abstract class ReconcilerNode {
  children: ReconcilerNode[] = [];
  yogaNode: YogaNode;

  protected constructor(style: YogaStyle) {
    const node: YogaNode = Yoga.Node.create();
    applyYogaStyle(node, style);
    this.yogaNode = node;
  }

  abstract draw(buffer: ImageBuffer): Promise<void>;

  protected getLayoutResults(): LayoutResults {
    return {
      dimensions: {
        width: this.yogaNode.getComputedWidth(),
        height: this.yogaNode.getComputedHeight(),
      },
      position: {
        top: this.yogaNode.getComputedTop(),
        left: this.yogaNode.getComputedLeft(),
      },
      display: (() => {
        const displayValue = this.yogaNode.getDisplay();
        switch (displayValue) {
          case Display.Flex:
            return "flex";
          case Display.None:
            return "none";
          case Display.Contents:
            return "contents";
          default:
            throw new Error(`Unknown display value: '${displayValue}'`);
        }
      })(),
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

export class ReconcilerTextNode extends ReconcilerNode {
  private readonly text: string;
  private readonly textStyle: TextStyle;

  constructor({ children, style }: TextProps) {
    const { color, fontSize, fontFamily, borderColor, borderWidth, ...yogaStyle } = style;
    super(yogaStyle);
    this.text = children;
    this.textStyle = { color, fontSize, fontFamily, borderColor, borderWidth };
  }

  override async draw(buffer: ImageBuffer): Promise<void> {
    const { dimensions, position, display }: LayoutResults = this.getLayoutResults();
    if (display === "none") return;

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
}

export class ReconcilerBoxNode extends ReconcilerNode {
  private readonly boxStyle: BoxStyle;

  constructor({ style }: BoxProps) {
    const { backgroundColor, borderColor, borderWidth, borderRadius, ...yogaStyle } = style;
    super(yogaStyle);
    this.boxStyle = { backgroundColor, borderColor, borderWidth, borderRadius };
  }

  override async draw(buffer: ImageBuffer): Promise<void> {
    const { dimensions, position, display }: LayoutResults = this.getLayoutResults();
    if (display === "none") return;

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

  override async draw(buffer: ImageBuffer): Promise<void> {
    const { dimensions, position, display }: LayoutResults = this.getLayoutResults();
    if (display === "none") return;

    const { dithering } = this.imageStyle;
    // TODO Implement image cache
    const image: RawImage = await resolveImage(this.src);
    await buffer.drawImage({ image, dimensions, position, dithering });
  }
}

export class ReconcilerNoopNode extends ReconcilerNode {
  constructor() {
    super({});
  }

  override async draw(_buffer: ImageBuffer): Promise<void> {}
}
