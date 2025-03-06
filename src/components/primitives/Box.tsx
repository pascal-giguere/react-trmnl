import React, { type ReactElement } from "react";
import { Color } from "../.././rendering/colors.mjs";

interface Props {
  children?: ReactElement | ReactElement[];
  width: number;
  height: number;
  left?: number;
  top?: number;
  backgroundColor?: Color;
  borderColor?: Color;
  borderWidth?: number;
  borderRadius?: number;
}

export const Box = ({
  children,
  width,
  height,
  left = 0,
  top = 0,
  backgroundColor = Color.None,
  borderColor = Color.Black,
  borderWidth = 0,
  borderRadius = 0,
}: Props): ReactElement => (
  <trmnl-box
    left={left}
    top={top}
    width={width}
    height={height}
    backgroundColor={backgroundColor}
    borderColor={borderColor}
    borderWidth={borderWidth}
    borderRadius={borderRadius}
    children={children}
  />
);
