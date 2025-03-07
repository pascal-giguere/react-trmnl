import type { ReactElement } from "react";
import type { RawBWImage } from "./types.mjs";
import { ReconcilerRoot } from "../reconciling/root.mjs";
import { encodeImage } from "./encoding.mjs";
import { OutputImageFormat } from "./images.mjs";

export type RenderOptions = {
  width?: number;
  height?: number;
  format?: OutputImageFormat;
};

export async function render(
  element: ReactElement,
  { width = 800, height = 480, format = OutputImageFormat.PNG }: RenderOptions,
): Promise<Buffer> {
  const root = new ReconcilerRoot({ width, height });
  await root.render(element);
  const image: RawBWImage = root.getRawImage();
  return encodeImage(image, format);
}
