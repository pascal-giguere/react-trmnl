import type { ReactElement } from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../constants.mjs";
import { Trmnl, type Props as TrmnlProps } from "../components/primitives/Trmnl.js";
import { ReconcilerRoot } from "../reconciling/root.mjs";
import { encodeImage } from "./encoding.mjs";
import { OutputImageFormat } from "./images.mjs";
import type { RawBWImage } from "./types.mjs";

export async function render(element: ReactElement, format: OutputImageFormat): Promise<Buffer> {
  validateRootElement(element, Trmnl.name);
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = element.props as TrmnlProps;
  const root = new ReconcilerRoot({ width, height });
  await root.render(element);
  const image: RawBWImage = root.getRawImage();
  return encodeImage(image, format);
}

function validateRootElement(element: ReactElement, expectedType: string): void {
  const elementType: string = typeof element.type === "function" ? element.type.name : element.type;
  if (elementType !== expectedType) {
    throw new Error(
      `Cannot use <${elementType}> as trmnl-react root element. Make sure to use <${expectedType}> instead.`,
    );
  }
}
