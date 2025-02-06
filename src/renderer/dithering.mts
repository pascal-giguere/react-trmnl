import Dither from "canvas-dither";
import { toRGBA } from "./channels.mjs";

export async function ditherImage(image: RawImage): Promise<RawBWImage> {
  const rgbaImage: RawRGBAImage = await toRGBA(image);
  const dithered: RawBWImage = Dither.atkinson(rgbaImage);
  return { data: dithered.data, width: image.width, height: image.height, channels: 1 };
}
