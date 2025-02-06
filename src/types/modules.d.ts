declare module "canvas-dither" {
  type CanvasDitherImage = { data: Buffer; width: number; height: number };

  export function threshold(image: CanvasDitherImage, threshold: number): CanvasDitherImage;

  export function atkinson(image: CanvasDitherImage): CanvasDitherImage;
}
