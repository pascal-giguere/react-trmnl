import React, { type ReactElement } from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../constants.mjs";
import type { RootYogaStyle } from "../../layout/types.mjs";

export interface Props {
  children: ReactElement | ReactElement[];
  width?: number;
  height?: number;
  style?: RootYogaStyle;
}

export const Trmnl = ({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  style = {},
}: Props): ReactElement => <trmnl-root width={width} height={height} style={style} children={children} />;
