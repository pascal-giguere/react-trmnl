import React, { type ReactElement } from "react";
import { Color } from "../../renderer/colors.mjs";
import { type Font, DefaultFont } from "../../renderer/fonts.mjs";

interface Props {
  children: string;
  width: number;
  height: number;
  left?: number;
  top?: number;
  color?: Color;
  fontSize?: number;
  fontFamily?: Font;
  borderColor?: Color;
  borderWidth?: number;
}

export const Text = ({
  children,
  width,
  height,
  left = 0,
  top = 0,
  color = Color.Black,
  fontSize = 12,
  fontFamily = DefaultFont.Sans,
  borderColor = Color.None,
  borderWidth = 1,
}: Props): ReactElement => (
  <trmnl-text
    children={children}
    width={width}
    height={height}
    left={left}
    top={top}
    color={color}
    fontSize={fontSize}
    fontFamily={fontFamily}
    borderColor={borderColor}
    borderWidth={borderWidth}
  />
);
