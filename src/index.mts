import type { ReactElement } from "react";
import { ReconcilerRoot } from "./reconciler/root.mjs";
import type { RawBWImage } from "./renderer/types.mjs";
import { encodeImage, ImageFormat } from "./renderer/encoding.mjs";
export { ImageFormat };

export type RenderOptions = {
  width: number;
  height: number;
  format: ImageFormat;
};

const defaultOpts: RenderOptions = {
  width: 800,
  height: 480,
  format: ImageFormat.PNG,
};

export async function render(element: ReactElement, opts: RenderOptions = defaultOpts): Promise<Buffer> {
  const { width, height, format } = opts;
  const root = new ReconcilerRoot({ width, height });
  await root.render(element);
  const image: RawBWImage = root.getRawImage();
  return encodeImage(image, format);
}
