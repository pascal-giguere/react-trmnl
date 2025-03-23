import type { JSX } from "react";
import type { HostConfig } from "react-reconciler";
import type { ReconcilerRoot } from "./root.mjs";
import type { ReconcilerNode, ReconcilerNoopNode } from "./nodes.mjs";
import type { TrmnlElement } from "./host.mjs";
import type { RootStyle, TextStyle, BoxStyle, ImageStyle } from "../styling/types.mjs";
import type { RootYogaStyle, YogaStyle } from "../layout/types.mjs";

export type InstanceType = TrmnlElement;
export type Props = RootProps | TextProps | BoxProps | ImageProps;
export type Instance = ReconcilerNode;
export type TextInstance = ReconcilerNoopNode;
export type HostContext = object;
export type UpdatePayload = true;

export type ReconcilerHostConfig = HostConfig<
  InstanceType,
  Props,
  ReconcilerRoot,
  Instance,
  TextInstance,
  never,
  never,
  Instance,
  HostContext,
  UpdatePayload,
  unknown,
  unknown,
  unknown
>;

export type RootProps = {
  width: number;
  height: number;
  style: RootStyle & RootYogaStyle;
  children: JSX.Element | JSX.Element[];
};

export type TextProps = { style: TextStyle & YogaStyle; children: string };

export type BoxProps = { style: BoxStyle & YogaStyle; children?: JSX.Element | JSX.Element[] };

export type ImageProps = { style: ImageStyle & YogaStyle; src: string };
