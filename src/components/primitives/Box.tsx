import React, { type ReactElement } from "react";
import { Color } from "../.././rendering/colors.mjs";
import type { BoxStyle } from "../../styling/types.mjs";
import type { YogaStyle } from "../../layout/types.mjs";

interface Props {
  children?: ReactElement | ReactElement[];
  style?: Partial<BoxStyle> & YogaStyle;
}

const DEFAULT_STYLE: BoxStyle = {
  backgroundColor: Color.None,
  borderColor: Color.Black,
  borderWidth: 0,
  borderRadius: 0,
  color: "inherit",
  fontFamily: "inherit",
  fontSize: "inherit",
};

export const Box = ({ children, style }: Props): ReactElement => (
  <trmnl-box style={{ ...DEFAULT_STYLE, ...style }} children={children} />
);
