import type { RenderingDimensions, RenderingPosition } from ".././rendering/types.mjs";

export type LayoutResults = {
  dimensions: RenderingDimensions;
  position: RenderingPosition;
  display: "flex" | "contents" | "none";
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

export type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";

export type YogaStyle = {
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  alignSelf?: AlignItems;
  aspectRatio?: number;
  borderBottomWidth?: number;
  borderEndWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderStartWidth?: number;
  borderTopWidth?: number;
  borderWidth?: number;
  borderInlineWidth?: number;
  borderBlockWidth?: number;
  bottom?: number | `${number}%`;
  boxSizing?: "border-box" | "content-box";
  direction?: "ltr" | "rtl";
  display?: "none" | "flex" | "contents";
  end?: number | `${number}%`;
  flex?: number;
  flexBasis?: number | "auto" | `${number}%`;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  rowGap?: number;
  gap?: number;
  columnGap?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  height?: number | "auto" | `${number}%`;
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
  start?: number | `${number}%`;
  top?: number | `${number}%`;
  insetInline?: number | `${number}%`;
  insetBlock?: number | `${number}%`;
  inset?: number | `${number}%`;
  width?: number | "auto" | `${number}%`;
};
