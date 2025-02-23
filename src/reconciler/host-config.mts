import type { HostConfig } from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants.js";

export type ReconcilerHostConfig = HostConfig<
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown
>;

const rootHostContext = {};
const childHostContext = {};

export const hostConfig: ReconcilerHostConfig = {
  getRootHostContext: () => {
    console.log("getRootHostContext");
    return rootHostContext;
  },
  prepareForCommit: (containerInfo) => {
    console.log("prepareForCommit", containerInfo);
    return null;
  },
  resetAfterCommit: (): void => {
    console.log("resetAfterCommit");
  },
  getChildHostContext: () => {
    console.log("getChildHostContext");
    return childHostContext;
  },
  shouldSetTextContent(type, nextProps): boolean {
    console.log("shouldSetTextContent", type, nextProps);
    return false;
  },
  /**
   This is where react-reconciler wants to create an instance of UI element in terms of the target.
   Since our target here is the DOM, we will create document.createElement and type is the argument that contains the type string like div or img or h1 etc.
   The initial values of domElement attributes can be set in this function from the newProps argument
   */
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    console.log("createInstance", type, newProps);
  },
  createTextInstance: (text, rootContainerInstance, hostContext, internalInstanceHandle) => {
    console.log("createTextInstance", text);
    return text;
  },
  appendInitialChild: (parent, child): void => {
    console.log("appendInitialChild", parent, child);
  },
  appendChild(parent, child): void {
    console.log("appendChild", parent, child);
  },
  finalizeInitialChildren: (domElement, type, props): boolean => {
    console.log("finalizeInitialChildren", domElement, type, props);
    return false;
  },
  supportsMutation: true,
  appendChildToContainer: (parent, child): void => {
    console.log("appendChildToContainer", parent, child);
  },
  prepareUpdate(domElement, oldProps, newProps) {
    console.log("prepareUpdate", domElement, oldProps, newProps);
    return true;
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps): void {
    console.log("commitUpdate", domElement, updatePayload, type, oldProps, newProps);
  },
  commitTextUpdate(textInstance, oldText, newText): void {
    console.log("commitTextUpdate", textInstance, oldText, newText);
  },
  removeChild(parentInstance, child) {
    console.log("removeChild", parentInstance, child);
  },
  clearContainer(container: unknown): void {
    console.log("clearContainer", container);
  },
  // @ts-expect-error - Missing from type definitions
  resolveUpdatePriority() {
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
