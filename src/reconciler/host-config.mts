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

export const hostConfig: Partial<ReconcilerHostConfig> = {
  supportsMutation: true,
  appendInitialChild: (parent, child) => {
    console.log("appendInitialChild", parent, child);
  },
  appendChild(parent, child) {
    console.log("appendChild", parent, child);
  },
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    console.log("createInstance", type, newProps);
  },
  createTextInstance: (text, rootContainerInstance, hostContext, internalInstanceHandle) => {
    return text;
  },
  shouldSetTextContent(type, nextProps) {
    return false;
  },
  // @ts-expect-error - Missing from type definitions
  resolveUpdatePriority() {
    return DefaultEventPriority;
  },
};
