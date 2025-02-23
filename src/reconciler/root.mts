import { type ReactNode } from "react";
import { ImageBuffer } from "../renderer/compositing.mjs";
import type { RawBWImage, RenderingDimensions } from "../renderer/types.mjs";
import { hostConfig, type ReconcilerHostConfig } from "./host-config.mjs";
import ReactReconciler, { type OpaqueRoot } from "react-reconciler";

const reconciler = ReactReconciler(hostConfig as ReconcilerHostConfig);

export class ReconcilerRoot {
  rootContainer: OpaqueRoot;
  private readonly buffer: ImageBuffer;

  constructor(dimensions: RenderingDimensions) {
    this.rootContainer = reconciler.createContainer(this, 0, null, false, null, "", () => {}, null);
    this.buffer = new ImageBuffer(dimensions);
  }

  async render(element: ReactNode): Promise<void> {
    return new Promise((resolve) => {
      reconciler.updateContainer(element, this.rootContainer, null, () => resolve());
    });
  }

  getRawImage(): RawBWImage {
    return this.buffer.toRawImage();
  }
}
