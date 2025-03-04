import type { OpaqueHandle } from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants.js";
import type { ReconcilerRoot } from "./root.mjs";
import { ReconcilerImageNode, ReconcilerSvgNode } from "./nodes.mjs";
import type {
  BoxProps,
  HostContext,
  ImageProps,
  Instance,
  InstanceType,
  Props,
  ReconcilerHostConfig,
  TextInstance,
  TextProps,
  UpdatePayload,
} from "./types.mjs";

export enum TrmnlElement {
  Text = "trmnl-text",
  Box = "trmnl-box",
  Image = "trmnl-image",
}

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
    switch (type) {
      case TrmnlElement.Text:
        return ReconcilerSvgNode.fromTextProps(props as TextProps);
      case TrmnlElement.Box:
        return ReconcilerSvgNode.fromBoxProps(props as BoxProps);
      case TrmnlElement.Image:
        return ReconcilerImageNode.fromImageProps(props as ImageProps);
      default:
        throw new Error(`Unsupported JSX element: <${type}>`);
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
