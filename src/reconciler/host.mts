import { DefaultEventPriority } from "react-reconciler/constants.js";
import type { ReconcilerRoot } from "./root.mjs";
import { ReconcilerNode } from "./nodes.mjs";
import type {
  HostContext,
  ReconcilerHostConfig,
  Instance,
  TextInstance,
  InstanceType,
  Props,
  UpdatePayload,
} from "./types.mjs";

let updatePriority: number = DefaultEventPriority;
const rootHostContext: HostContext = {};
const childHostContext: HostContext = {};

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
    rootContainer: ReconcilerRoot,
    currentHostContext: HostContext,
  ): Instance => {
    console.log("createInstance", type, props, rootContainer, currentHostContext);
    return new ReconcilerNode();
  },
  createTextInstance: (
    text: string,
    _rootContainer: ReconcilerRoot,
    _hostContext: HostContext,
    _internalInstanceHandle,
  ): TextInstance => {
    return new ReconcilerNode(text);
  },
  appendInitialChild: (parent: Instance, child: Instance): void => {
    console.log("appendInitialChild", parent, child);
    parent.appendChild(child);
  },
  appendChild(parent: Instance, child: Instance): void {
    console.log("appendChild", parent, child);
    parent.appendChild(child);
  },
  removeChild(parent: Instance, child: Instance): void {
    console.log("removeChild", parent, child);
    parent.removeChild(child);
  },
  finalizeInitialChildren: (
    instance: Instance,
    type: InstanceType,
    props: Props,
    rootContainer: ReconcilerRoot,
    hostContext: HostContext,
  ): boolean => {
    // TODO Looks like the signature is wrong and rootContainer is not actually in params
    console.log("finalizeInitialChildren", instance, type, props, rootContainer, hostContext);
    return false;
  },
  appendChildToContainer: (container: ReconcilerRoot, child: Instance): void => {
    console.log("appendChildToContainer1", container, child);
    container.setRootNode(child);
  },
  prepareUpdate(
    instance: Instance,
    type: InstanceType,
    oldProps: Props,
    newProps: Props,
    rootContainer: ReconcilerRoot,
    hostContext: HostContext,
  ): UpdatePayload {
    console.log("prepareUpdate", instance, type, oldProps, newProps, rootContainer, hostContext);
    return true;
  },
  prepareForCommit: (containerInfo: ReconcilerRoot) => {
    console.log("prepareForCommit", containerInfo);
    return null;
  },
  commitUpdate(
    instance: Instance,
    updatePayload: UpdatePayload,
    type: InstanceType,
    oldProps: Props,
    newProps: Props,
    internalInstanceHandle,
  ): void {
    console.log("commitUpdate", instance, updatePayload, type, oldProps, newProps, internalInstanceHandle);
  },
  commitTextUpdate(textInstance: TextInstance, oldText: string, newText: string): void {
    console.log("commitTextUpdate", textInstance, oldText, newText);
  },
  resetAfterCommit: (containerInfo: ReconcilerRoot): void => {
    console.log("resetAfterCommit", containerInfo);
  },
  clearContainer(container: ReconcilerRoot): void {
    console.log("clearContainer", container);
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
