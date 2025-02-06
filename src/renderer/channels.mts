import sharp from "sharp";

export async function toRGBA(image: RawImage): Promise<RawRGBAImage> {
  const data: Buffer = await sharp(image.data, {
    raw: {
      width: image.width,
      height: image.height,
      channels: image.channels,
    },
  })
    .toColorspace("srgb")
    .ensureAlpha()
    .raw()
    .toBuffer();
  return { data, width: image.width, height: image.height, channels: 4 };
}
