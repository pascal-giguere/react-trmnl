import type { ReconcilerRoot } from "./root.mjs";
import type { HostConfig } from "react-reconciler";
import type { ReconcilerNode } from "./nodes.mjs";

export type InstanceType = "text" | "element";
export type Props = { children: string };
export type Instance = ReconcilerNode;
export type TextInstance = ReconcilerNode;
export type HostContext = { todo?: string };
export type UpdatePayload = unknown;

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
