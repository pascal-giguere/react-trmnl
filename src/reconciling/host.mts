import type { OpaqueHandle } from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants.js";
import {
  ReconcilerNode,
  ReconcilerRootNode,
  ReconcilerTextNode,
  ReconcilerBoxNode,
  ReconcilerImageNode,
  ReconcilerNoopNode,
} from "./nodes.mjs";
import type { ReconcilerRoot } from "./root.mjs";
import type {
  BoxProps,
  HostContext,
  ImageProps,
  Instance,
  InstanceType,
  Props,
  ReconcilerHostConfig,
  RootProps,
  TextInstance,
  TextProps,
  UpdatePayload,
} from "./types.mjs";

export enum TrmnlElement {
  Root = "trmnl-root",
  Text = "trmnl-text",
  Box = "trmnl-box",
  Image = "trmnl-image",
}

let updatePriority: number = DefaultEventPriority;

export const host: ReconcilerHostConfig = {
  supportsMutation: true,
  shouldSetTextContent(_type: InstanceType, _props: Props): boolean {
    return false;
  },
  // @ts-expect-error - Missing from type definitions
  maySuspendCommit(_type: InstanceType, _props: Props): boolean {
    return false;
  },
  getRootHostContext: (_rootContainer: ReconcilerRoot): HostContext => {
    return {};
  },
  getChildHostContext: (
    _parentHostContext: HostContext,
    _type: InstanceType,
    _rootContainer: ReconcilerRoot | undefined,
  ): HostContext => {
    return {};
  },
  createInstance: (
    type: InstanceType,
    props: Props,
    _rootContainer: ReconcilerRoot,
    _currentHostContext: HostContext,
  ): Instance => {
    switch (type) {
      case TrmnlElement.Root:
        return new ReconcilerRootNode(props as RootProps);
      case TrmnlElement.Text:
        return new ReconcilerTextNode(props as TextProps);
      case TrmnlElement.Box:
        return new ReconcilerBoxNode(props as BoxProps);
      case TrmnlElement.Image:
        return new ReconcilerImageNode(props as ImageProps);
      default:
        throw new Error(`JSX element '<${type}>' is not supported by react-trmnl.`);
    }
  },
  createTextInstance: (
    _text: string,
    _rootContainer: ReconcilerRoot,
    _hostContext: HostContext,
    _internalInstanceHandle,
  ): TextInstance => {
    return new ReconcilerNoopNode();
  },
  getPublicInstance: (instance: Instance): Instance => {
    return instance;
  },
  appendInitialChild: (parent: Instance, child: Instance): void => {
    parent.appendChild(child);
  },
  appendChild(parent: Instance, child: Instance): void {
    parent.appendChild(child);
  },
  insertBefore(parent: ReconcilerNode, child: ReconcilerNode, beforeChild: ReconcilerNode): void {
    parent.insertBefore(child, beforeChild);
  },
  removeChild(parent: Instance, child: Instance): void {
    parent.removeChild(child);
  },
  // Incorrect type definitions, rootContainer is not in params
  finalizeInitialChildren: (
    _instance: Instance,
    _type: InstanceType,
    _props: Props,
    _hostContext: HostContext,
  ): boolean => {
    return false;
  },
  appendChildToContainer: (container: ReconcilerRoot, child: Instance): void => {
    if (!(child instanceof ReconcilerRootNode)) {
      throw new Error("Could not find react-trmnl root. Make sure to wrap your app in <Trmnl>.");
    }
    container.setRootNode(child as ReconcilerRootNode);
  },
  detachDeletedInstance: (_instance: Instance): void => {},
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
    container.clear();
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
