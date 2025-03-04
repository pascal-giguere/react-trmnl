import type { Color } from "../renderer/colors.mjs";
import type { Font } from "../renderer/fonts.mjs";
import type { Dithering } from "../renderer/dithering.mjs";

export type TextStyle = {
  color: Color;
  fontSize: number;
  fontFamily: Font;
  borderColor: Color;
  borderWidth: number;
};

export type BoxStyle = {
  backgroundColor: Color;
  borderColor: Color;
  borderWidth: number;
  borderRadius: number;
};

export type ImageStyle = {
  dithering: Dithering;
};
