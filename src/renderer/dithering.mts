export function threshold(image: RawBWImage, threshold: number): RawBWImage {
  const data = Buffer.from(image.data.map((value) => (value < threshold ? 0 : 255)));
  return { ...image, data };
}

export function atkinson(image: RawBWImage): RawBWImage {
  const inData = Buffer.from(image.data);
  const outData = Buffer.alloc(image.data.length);

  for (let i = 0; i < inData.length; i++) {
    const value = inData[i] < 129 ? 0 : 255;
    const error = Math.floor((inData[i] - value) / 8);
    inData[i + 1] += error;
    inData[i + 2] += error;
    inData[i + image.width - 1] += error;
    inData[i + image.width] += error;
    inData[i + image.width + 1] += error;
    inData[i + 2 * image.width] += error;
    outData[i] = value;
  }

  return { ...image, data: outData };
}
