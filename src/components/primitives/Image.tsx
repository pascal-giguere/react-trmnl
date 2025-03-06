import React, { type ReactElement } from "react";
import { Dithering } from "../.././rendering/dithering.mjs";

interface Props {
  src: string;
  width: number;
  height: number;
  left?: number;
  top?: number;
  dithering?: Dithering;
}

export const Image = ({
  src,
  width,
  height,
  left = 0,
  top = 0,
  dithering = Dithering.Atkinson,
}: Props): ReactElement => (
  <trmnl-image src={src} width={width} height={height} left={left} top={top} dithering={dithering} />
);
