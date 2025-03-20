import React, { type ReactElement } from "react";
import { Dithering } from "../.././rendering/dithering.mjs";
import type { ImageStyle } from "../../styling/types.mjs";
import type { YogaStyle } from "../../layout/types.mjs";

interface Props {
  src: string;
  style?: Partial<ImageStyle> & YogaStyle;
}

const DEFAULT_STYLE: ImageStyle = {
  dithering: Dithering.Atkinson,
};

export const Image = ({ src, style }: Props): ReactElement => (
  <trmnl-image src={src} style={{ ...DEFAULT_STYLE, ...style }} />
);
