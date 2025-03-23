import type { Color } from ".././rendering/colors.mjs";
import type { Font } from ".././rendering/fonts.mjs";
import type { Dithering } from ".././rendering/dithering.mjs";

export type InheritedStyle = {
  color: Color | "inherit";
  fontSize: number | "inherit";
  fontFamily: Font | "inherit";
};

export type RootStyle = InheritedStyle;

export type TextStyle = InheritedStyle & {
  borderColor: Color;
  borderWidth: number;
};

export type BoxStyle = InheritedStyle & {
  backgroundColor: Color;
  borderColor: Color;
  borderWidth: number;
  borderRadius: number;
};

export type ImageStyle = {
  dithering: Dithering;
};
