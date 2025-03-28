import type { RenderingDimensions, RenderingPosition } from ".././rendering/types.mjs";

export type LayoutResults = {
  dimensions: RenderingDimensions;
  position: RenderingPosition;
  display: Display;
};

export type AlignContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";

export type Display = "flex" | "contents" | "none";

export type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";

export type YogaStyle = {
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  alignSelf?: AlignItems;
  aspectRatio?: number;
  borderWidth?: number;
  bottom?: number | `${number}%`;
  boxSizing?: "border-box" | "content-box";
  columnGap?: number;
  direction?: "ltr" | "rtl";
  display?: Display;
  end?: number | `${number}%`;
  flex?: number;
  flexBasis?: number | "auto" | `${number}%`;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: number;
  height?: number | "auto" | `${number}%`;
  inset?: number | `${number}%`;
  insetInline?: number | `${number}%`;
  insetBlock?: number | `${number}%`;
  justifyContent?: JustifyContent;
  left?: number | `${number}%`;
  margin?: number | "auto" | `${number}%`;
  marginBottom?: number | "auto" | `${number}%`;
  marginEnd?: number | "auto" | `${number}%`;
  marginLeft?: number | "auto" | `${number}%`;
  marginRight?: number | "auto" | `${number}%`;
  marginStart?: number | "auto" | `${number}%`;
  marginTop?: number | "auto" | `${number}%`;
  marginInline?: number | "auto" | `${number}%`;
  marginBlock?: number | "auto" | `${number}%`;
  maxHeight?: number | `${number}%`;
  maxWidth?: number | `${number}%`;
  minHeight?: number | `${number}%`;
  minWidth?: number | `${number}%`;
  padding?: number | `${number}%`;
  paddingBottom?: number | `${number}%`;
  paddingEnd?: number | `${number}%`;
  paddingLeft?: number | `${number}%`;
  paddingRight?: number | `${number}%`;
  paddingStart?: number | `${number}%`;
  paddingTop?: number | `${number}%`;
  paddingInline?: number | `${number}%`;
  paddingBlock?: number | `${number}%`;
  position?: "absolute" | "relative" | "static";
  right?: number | `${number}%`;
  rowGap?: number;
  start?: number | `${number}%`;
  top?: number | `${number}%`;
  width?: number | "auto" | `${number}%`;
};

export type RootYogaStyle = Pick<
  YogaStyle,
  | "alignContent"
  | "alignItems"
  | "columnGap"
  | "direction"
  | "flex"
  | "flexBasis"
  | "flexDirection"
  | "flexGrow"
  | "flexShrink"
  | "flexWrap"
  | "gap"
  | "justifyContent"
  | "padding"
  | "paddingBottom"
  | "paddingEnd"
  | "paddingLeft"
  | "paddingRight"
  | "paddingStart"
  | "paddingTop"
  | "paddingInline"
  | "paddingBlock"
  | "position"
  | "rowGap"
>;
