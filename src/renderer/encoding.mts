import { encode as bmpEncode, BmpCompression } from "bmp-ts";

export function encodeBmp(image: RawImage): Uint8Array {
  const { data, width, height } = image;
  const { data: out } = bmpEncode({
    data,
    width,
    height,
    bitPP: 1,
    compression: BmpCompression.NONE,
  });
  return out;
}
