import type { FastifyReply, FastifyRequest } from "fastify";
import { encodeImage, ImageFormat } from "../renderer/encoding.mjs";
import type { RawBWImage } from "../renderer/types.mjs";
import { renderReact } from "../renderer/react.js";

export async function getPreview(_: FastifyRequest, rep: FastifyReply): Promise<void> {
  const image: RawBWImage = await renderReact();
  const pngFile: Buffer = await encodeImage(image, ImageFormat.PNG);
  rep
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "image/png",
      "Content-Length": pngFile.length.toString(),
    })
    .send(pngFile);
}
