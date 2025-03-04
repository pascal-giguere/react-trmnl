import type { ReconcilerRoot } from "./root.mjs";
import type { HostConfig } from "react-reconciler";
import type { ReconcilerNode } from "./nodes.mjs";
import type { RawImage } from "../renderer/types.mjs";
import type { Dithering } from "../renderer/dithering.mjs";

export type InstanceType = "trmnl-text" | "trmnl-box" | "trmnl-image";
export type Props = TextProps | BoxProps | ImageProps;
export type Instance = ReconcilerNode;
export type TextInstance = never;
export type HostContext = { todo?: string };
export type UpdatePayload = true;

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

export type TextProps = { children: string };
export type BoxProps = { children: string };
export type ImageProps = { src: string; dithering: Dithering };

export type NodeContent = TextContent | SvgContent | ImageContent;

export type TextContent = {
  text: string;
};

export type SvgContent = {
  svg: string;
};

export type ImageContent = {
  image: RawImage;
  dithering: Dithering;
};
