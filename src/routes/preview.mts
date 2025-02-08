import type { FastifyRequest, FastifyReply } from "fastify";
import { testCompositing } from "../renderer/dev-utils.mjs";
import { ImageFormat } from "../renderer/encoding.mjs";

export async function getPreview(_: FastifyRequest, rep: FastifyReply): Promise<void> {
  const pngFile: Buffer = await testCompositing(800, 480, ImageFormat.PNG);
  rep
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "image/png",
      "Content-Length": pngFile.length.toString(),
    })
    .send(pngFile);
}
