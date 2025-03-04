import { DefaultEventPriority } from "react-reconciler/constants.js";
import type { ReconcilerRoot } from "./root.mjs";
import { ReconcilerImageNode, ReconcilerSvgNode, ReconcilerTextNode } from "./nodes.mjs";
import type {
  HostContext,
  ReconcilerHostConfig,
  Instance,
  TextInstance,
  InstanceType,
  Props,
  UpdatePayload,
  BoxProps,
  TextProps,
  ImageProps,
} from "./types.mjs";
import type { OpaqueHandle } from "react-reconciler";
import type { RawImage } from "../renderer/types.mjs";

let updatePriority: number = DefaultEventPriority;
const rootHostContext: HostContext = {};
const childHostContext: HostContext = {};

export const host: ReconcilerHostConfig = {
  supportsMutation: true,
  shouldSetTextContent(_type: InstanceType, _props: Props): boolean {
    return true;
  },
  // Missing from type definitions
  maySuspendCommit(_type: InstanceType, _props: Props): boolean {
    return false;
  },
  getRootHostContext: (_rootContainer: ReconcilerRoot): HostContext => {
    return rootHostContext;
  },
  getChildHostContext: (
    _parentHostContext: HostContext,
    _type: InstanceType,
    _rootContainer: ReconcilerRoot | undefined,
  ): HostContext => {
    return childHostContext;
  },
  createInstance: (
    type: InstanceType,
    props: Props,
    _rootContainer: ReconcilerRoot,
    _currentHostContext: HostContext,
  ): Instance => {
    // TODO Finish implementing
    switch (type) {
      case "trmnl-text": {
        const textProps = props as TextProps;
        return new ReconcilerTextNode(
          textProps.children,
          {
            position: { top: 0, left: 0 },
            dimensions: { width: 400, height: 100 },
          },
          {},
        );
      }
      case "trmnl-box": {
        const boxProps = props as BoxProps;
        return new ReconcilerSvgNode(boxProps.children, {
          position: { top: 0, left: 0 },
          dimensions: { width: 400, height: 100 },
        });
      }
      case "trmnl-image": {
        const imageProps = props as ImageProps;
        // TODO: Load image from src
        const image: RawImage = { data: Buffer.alloc(0), width: 0, height: 0, channels: 1 };
        return new ReconcilerImageNode(image, imageProps.dithering, {
          position: { top: 0, left: 0 },
          dimensions: { width: 400, height: 100 },
        });
      }
      default:
        throw new Error(`Unsupported instance type: ${type}`);
    }
  },
  createTextInstance: (
    _text: string,
    _rootContainer: ReconcilerRoot,
    _hostContext: HostContext,
    _internalInstanceHandle,
  ): TextInstance => {
    throw new Error("Unsupported text instance");
  },
  appendInitialChild: (parent: Instance, child: Instance): void => {
    parent.appendChild(child);
  },
  appendChild(parent: Instance, child: Instance): void {
    parent.appendChild(child);
  },
  removeChild(parent: Instance, child: Instance): void {
    parent.removeChild(child);
  },
  // @ts-expect-error - Incorrect type definitions, rootContainer is not in params
  finalizeInitialChildren: (
    _instance: Instance,
    _type: InstanceType,
    _props: Props,
    _hostContext: HostContext,
  ): boolean => {
    return false;
  },
  appendChildToContainer: (container: ReconcilerRoot, child: Instance): void => {
    container.setRootNode(child);
  },
  prepareUpdate(
    _instance: Instance,
    _type: InstanceType,
    _oldProps: Props,
    _newProps: Props,
    _rootContainer: ReconcilerRoot,
    _hostContext: HostContext,
  ): UpdatePayload {
    return true;
  },
  prepareForCommit: (_containerInfo: ReconcilerRoot) => {
    return null;
  },
  commitUpdate(
    _instance: Instance,
    _updatePayload: UpdatePayload,
    _type: InstanceType,
    _oldProps: Props,
    _newProps: Props,
    _internalInstanceHandle: OpaqueHandle,
  ): void {},
  commitTextUpdate(_textInstance: TextInstance, _oldText: string, _newText: string): void {},
  resetAfterCommit: (_containerInfo: ReconcilerRoot): void => {},
  clearContainer(container: ReconcilerRoot): void {
    container.clearBuffer();
  },
  // Missing from type definitions
  resolveUpdatePriority(): number {
    return updatePriority;
  },
  // Missing from type definitions
  getCurrentUpdatePriority(): number {
    return updatePriority;
  },
  // Missing from type definitions
  setCurrentUpdatePriority: function (newPriority: number): void {
    updatePriority = newPriority;
  },
};
