export function iSBWImage(image: RawImage): image is RawBWImage {
  return image.channels === 1;
}

export function isBWAImage(image: RawImage): image is RawBWAImage {
  return image.channels === 2;
}

export function isRGBImage(image: RawImage): image is RawRGBImage {
  return image.channels === 3;
}

export function isRGBAImage(image: RawImage): image is RawRGBAImage {
  return image.channels === 4;
}
