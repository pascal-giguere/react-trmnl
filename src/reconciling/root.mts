import { type ReactNode } from "react";
import ReactReconciler, { type OpaqueRoot } from "react-reconciler";
import { host } from "./host.mjs";
import type { RawBWImage } from ".././rendering/types.mjs";
import type { ReconcilerRootNode } from "./nodes.mjs";

const RECONCILER_ID_PREFIX = "react-trmnl";

const reconciler = ReactReconciler(host);

export class ReconcilerRoot {
  private rootContainer: OpaqueRoot;
  private rootNode: ReconcilerRootNode | null = null;

  constructor() {
    this.initContainer();
  }

  async render(element: ReactNode): Promise<RawBWImage> {
    return new Promise((resolve) => {
      reconciler.updateContainer(element, this.rootContainer, null, async () => {
        if (!this.rootNode) {
          throw new Error("Failed to initialize reconciler root node.");
        }
        resolve(this.rootNode.drawTree());
      });
    });
  }

  setRootNode(node: ReconcilerRootNode): void {
    this.rootNode = node;
  }

  clear(): void {
    this.initContainer();
  }

  private initContainer(): void {
    this.rootContainer = reconciler.createContainer(
      this,
      0,
      null,
      false,
      null,
      RECONCILER_ID_PREFIX,
      this.handleError,
      null,
    );
  }

  private handleError(error: Error): void {
    console.error("Reconciler error: " + error.message);
  }
}
