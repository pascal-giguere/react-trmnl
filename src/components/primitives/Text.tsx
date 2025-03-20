import React, { type ReactElement } from "react";
import { Color } from "../.././rendering/colors.mjs";
import { DefaultFont } from "../.././rendering/fonts.mjs";
import type { TextStyle } from "../../styling/types.mjs";
import type { YogaStyle } from "../../layout/types.mjs";

interface Props {
  children: string;
  style?: Partial<TextStyle> & YogaStyle;
}

const DEFAULT_STYLE: TextStyle = {
  color: Color.Black,
  fontSize: 12,
  fontFamily: DefaultFont.Sans,
  borderColor: Color.None,
  borderWidth: 0,
};

export const Text = ({ children, style }: Props): ReactElement => (
  <trmnl-text style={{ ...DEFAULT_STYLE, ...style }} children={children} />
);
