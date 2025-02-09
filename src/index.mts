import type { ReactElement } from "react";
import { ReconcilerRoot } from "./reconciler/root.mjs";
import type { RawBWImage } from "./renderer/types.mjs";
import { encodeImage, ImageFormat } from "./renderer/encoding.mjs";
export { ImageFormat };

type RenderOptions = {
  width: number;
  height: number;
  format: ImageFormat;
}

export async function render(element: ReactElement, opts: RenderOptions): Promise<Buffer> {
  const { width, height, format } = opts;
  const root = new ReconcilerRoot({ width, height });
  await root.render(element);
  const image: RawBWImage = root.getRawImage();
  return encodeImage(image, format);
}
