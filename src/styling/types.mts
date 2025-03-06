import type { Color } from ".././rendering/colors.mjs";
import type { Font } from ".././rendering/fonts.mjs";
import type { Dithering } from ".././rendering/dithering.mjs";

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
