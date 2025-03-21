import { type ReactNode } from "react";
import ReactReconciler, { type OpaqueRoot } from "react-reconciler";
import { host } from "./host.mjs";
import { ImageBuffer } from ".././rendering/compositing.mjs";
import type { RawBWImage, RenderingDimensions, RenderingPosition } from ".././rendering/types.mjs";
import { ReconcilerNode } from "./nodes.mjs";
import type { LayoutResults } from "../layout/types.mjs";

const RECONCILER_ID_PREFIX = "react-trmnl";

const reconciler = ReactReconciler(host);

export class ReconcilerRoot {
  private readonly buffer: ImageBuffer;
  private rootContainer: OpaqueRoot;
  private rootNode: ReconcilerNode | null = null;

  constructor(dimensions: RenderingDimensions) {
    this.buffer = new ImageBuffer(dimensions);
    this.initContainer();
  }

  async render(element: ReactNode): Promise<void> {
    return new Promise((resolve) => {
      reconciler.updateContainer(element, this.rootContainer, null, async () => {
        if (!this.rootNode) {
          throw new Error("Root node not set");
        }
        this.rootNode.yogaNode.calculateLayout("auto", "auto");
        await this.drawNode(this.rootNode);
        this.rootNode.yogaNode.freeRecursive();
        resolve();
      });
    });
  }

  setRootNode(node: ReconcilerNode): void {
    this.rootNode = node;
  }

  clear(): void {
    this.buffer.clear();
    this.initContainer();
  }

  getRawImage(): RawBWImage {
    return this.buffer.toRawImage();
  }

  private initContainer(): void {
    this.rootContainer = reconciler.createContainer(
      this,
      0,
      null,
      false,
      null,
      RECONCILER_ID_PREFIX,
      this.handleRecoverableError,
      null,
    );
  }

  private async drawNode(node: ReconcilerNode, basePosition: RenderingPosition = { top: 0, left: 0 }): Promise<void> {
    const { dimensions, position: layoutPosition, display }: LayoutResults = node.getLayoutResults();
    if (display === "none") return;

    const position: RenderingPosition = {
      top: basePosition.top + layoutPosition.top,
      left: basePosition.left + layoutPosition.left,
    };

    await node.draw(this.buffer, dimensions, position);

    for (const child of node.children) {
      await this.drawNode(child, position);
    }
  }

  private handleRecoverableError(error: Error): void {
    throw new Error("Reconciler error: " + JSON.stringify(error));
  }
}
