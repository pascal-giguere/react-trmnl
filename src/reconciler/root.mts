import { type ReactNode } from "react";
import ReactReconciler, { type OpaqueRoot } from "react-reconciler";
import { host } from "./host.mjs";
import { ImageBuffer } from "../renderer/compositing.mjs";
import type { RawBWImage, RenderingDimensions } from "../renderer/types.mjs";
import { ReconcilerNode } from "./nodes.mjs";

const RECONCILER_ID_PREFIX = "react-trmnl";

const reconciler = ReactReconciler(host);

export class ReconcilerRoot {
  private readonly buffer: ImageBuffer;
  private readonly rootContainer: OpaqueRoot;
  private rootNode: ReconcilerNode | null = null;

  constructor(dimensions: RenderingDimensions) {
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
    this.buffer = new ImageBuffer(dimensions);
  }

  async render(element: ReactNode): Promise<void> {
    return new Promise((resolve) => {
      reconciler.updateContainer(element, this.rootContainer, null, async () => {
        await this.drawNode(this.rootNode);
        resolve();
      });
    });
  }

  setRootNode(node: ReconcilerNode): void {
    this.rootNode = node;
  }

  getRawImage(): RawBWImage {
    return this.buffer.toRawImage();
  }

  private async drawNode(node: ReconcilerNode | null): Promise<void> {
    if (!node) {
      throw new Error("Root node not set");
    }

    if (node.content) {
      await this.buffer.drawText({
        text: node.content,
        dimensions: { width: 500, height: 100 },
        fontSize: 28,
      });
    }
    for (const child of node.children) {
      await this.drawNode(child);
    }
  }

  private handleRecoverableError(error: Error): void {
    console.error("Recoverable reconciler error:", error);
  }
}
