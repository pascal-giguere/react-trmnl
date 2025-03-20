import React, { type ReactElement } from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../constants.mjs";

export interface Props {
  children: ReactElement | ReactElement[];
  width?: number;
  height?: number;
}

export const Trmnl = ({ children, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT }: Props): ReactElement => (
  <trmnl-root width={width} height={height} children={children} />
);
