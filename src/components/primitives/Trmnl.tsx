import React, { type ReactElement } from "react";
import { Color } from "../../rendering/colors.mjs";
import { DefaultFont } from "../../rendering/fonts.mjs";
import type { RootStyle } from "../../styling/types.mjs";
import type { RootYogaStyle } from "../../layout/types.mjs";

export interface Props {
  children: ReactElement | ReactElement[];
  width?: number;
  height?: number;
  style?: Partial<RootStyle> & RootYogaStyle;
}

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 480;

const DEFAULT_STYLE: RootStyle = {
  color: Color.Black,
  fontFamily: DefaultFont.Sans,
  fontSize: 12,
};

export const Trmnl = ({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  style = {},
}: Props): ReactElement => (
  <trmnl-root width={width} height={height} style={{ ...DEFAULT_STYLE, ...style }} children={children} />
);
