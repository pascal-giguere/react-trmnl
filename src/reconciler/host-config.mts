import type { HostConfig } from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants.js";
import type { ReconcilerRoot } from "./root.mjs";

type InstanceType = "text" | "element";
type Props = Record<string, unknown>;
type Instance = unknown;
type TextInstance = unknown;
type HostContext = { todo?: string };
type UpdatePayload = unknown;

export type ReconcilerHostConfig = HostConfig<
  InstanceType,
  Props,
  ReconcilerRoot,
  Instance,
  TextInstance,
  never,
  never,
  never,
  HostContext,
  UpdatePayload,
  unknown,
  unknown,
  unknown
>;

const rootHostContext: HostContext = {};
const childHostContext: HostContext = {};

export const hostConfig: ReconcilerHostConfig = {
  getRootHostContext: (rootContainer: ReconcilerRoot): HostContext => {
    console.log("getRootHostContext", rootContainer);
    return rootHostContext;
  },
  prepareForCommit: (containerInfo: ReconcilerRoot) => {
    console.log("prepareForCommit", containerInfo);
    return null;
  },
  resetAfterCommit: (containerInfo: ReconcilerRoot): void => {
    console.log("resetAfterCommit", containerInfo);
  },
  getChildHostContext: (
    parentHostContext: HostContext,
    type: InstanceType,
    rootContainer: ReconcilerRoot | undefined,
  ): HostContext => {
    console.log("getChildHostContext", parentHostContext, type, rootContainer);
    return childHostContext;
  },
  shouldSetTextContent(type: InstanceType, nextProps: Props): boolean {
    console.log("shouldSetTextContent", type, nextProps);
    return false;
  },
  createInstance: (
    type: InstanceType,
    props: Props,
    rootContainer: ReconcilerRoot,
    currentHostContext: HostContext,
  ): Instance => {
    console.log("createInstance", type, props, rootContainer, currentHostContext);
    return null;
  },
  createTextInstance: (
    text: string,
    rootContainer: ReconcilerRoot,
    hostContext: HostContext,
    internalInstanceHandle,
  ): TextInstance => {
    console.log("createTextInstance", text, rootContainer, hostContext, internalInstanceHandle);
    return text;
  },
  appendInitialChild: (parent: Instance, child: Instance | TextInstance): void => {
    console.log("appendInitialChild", parent, child);
  },
  appendChild(parent: Instance, child: Instance | TextInstance): void {
    console.log("appendChild", parent, child);
  },
  finalizeInitialChildren: (
    instance: Instance,
    type: InstanceType,
    props: Props,
    rootContainer: ReconcilerRoot,
    hostContext: HostContext,
  ): boolean => {
    console.log("finalizeInitialChildren", instance, type, props, rootContainer, hostContext);
    return false;
  },
  supportsMutation: true,
  appendChildToContainer: (parent: ReconcilerRoot, child: Instance | TextInstance): void => {
    console.log("appendChildToContainer", parent, child);
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
  removeChild(parentInstance: Instance, child: Instance | TextInstance): void {
    console.log("removeChild", parentInstance, child);
  },
  clearContainer(container: ReconcilerRoot): void {
    console.log("clearContainer", container);
  },
  // @ts-expect-error - Missing from type definitions
  resolveUpdatePriority(): number {
    console.log("resolveUpdatePriority");
    return DefaultEventPriority;
  },
  getCurrentUpdatePriority(): number {
    console.log("getCurrentUpdatePriority");
    return DefaultEventPriority;
  },
  setCurrentUpdatePriority: function (newPriority: number): void {
    console.log("setCurrentUpdatePriority", newPriority);
  },
};
