import type { JSX } from "react";
import type { HostConfig } from "react-reconciler";
import type { ReconcilerRoot } from "./root.mjs";
import type { ReconcilerNode, ReconcilerNoopNode } from "./nodes.mjs";
import type { TrmnlElement } from "./host.mjs";
import type { Dithering } from ".././rendering/dithering.mjs";
import type { BoxStyle, ImageStyle, TextStyle } from "../styling/types.mjs";

export type InstanceType = TrmnlElement;
export type Props = TextProps | BoxProps | ImageProps;
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

type BaseProps = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type TextProps = TextStyle &
  BaseProps & {
    children: string;
  };

export type BoxProps = BoxStyle &
  BaseProps & {
    children?: JSX.Element | JSX.Element[];
  };

export type ImageProps = ImageStyle &
  BaseProps & {
    src: string;
  };

export type NodeContent = SvgContent | ImageContent | NoopContent;

export type SvgContent = {
  svg: string;
};

export type ImageContent = {
  src: string;
  dithering: Dithering;
};

export type NoopContent = unknown;
