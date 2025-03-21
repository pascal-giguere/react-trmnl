import type { ReactElement } from "react";
import { ReconcilerRoot } from "../reconciling/root.mjs";
import { encodeImage } from "./encoding.mjs";
import { OutputImageFormat } from "./images.mjs";
import type { RawBWImage } from "./types.mjs";

export async function render(element: ReactElement, format: OutputImageFormat): Promise<Buffer> {
  const image: RawBWImage = await new ReconcilerRoot().render(element);
  return encodeImage(image, format);
}
