import sharp from "sharp";
import { ImageFormat } from "../../src/index.mjs";
import { checkerboardBmp } from "./assets/paths.mjs";
import { encodeImage } from "../../src/rendering/encoding.mjs";
import { readImage } from "../../src/loading/filesystem.mjs";
import type { RawBWImage } from "../../src/rendering/types.mjs";

it("does a lossless BMP encode/decode cycle", async () => {
  const image: RawBWImage = await readImage(checkerboardBmp);
  const encoded: Buffer = await encodeImage(image, ImageFormat.BMP);
  const decoded: Buffer = await sharp(encoded).toColourspace("b-w").raw().toBuffer();
  expect(decoded.toString("base64")).toEqual(image.data.toString("base64"));
});
