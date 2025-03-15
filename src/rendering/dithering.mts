import type { RawBWImage } from "./types.mjs";

type Diffusion = { errorDiffusion: number[][]; errorScale: number };

export enum Dithering {
  None = "none",
  Atkinson = "atkinson",
  Box = "box",
  Burkes = "burkes",
  FloydSteinberg = "floyd-steinberg",
  JarvisJudiceNinke = "jarvis-judice-ninke",
  Pigeon = "pigeon",
  Stucki = "stucki",
}

const Atkinson: Diffusion = {
  errorDiffusion: [
    [1, 0, 1],
    [2, 0, 1],
    [-1, 1, 1],
    [0, 1, 1],
    [1, 1, 1],
    [0, 2, 1],
  ],
  errorScale: 8,
};

const Box: Diffusion = {
  errorDiffusion: [
    [1, 0, 1],
    [-1, 1, 1],
    [0, 1, 1],
    [1, 1, 1],
  ],
  errorScale: 4,
};

const Burkes: Diffusion = {
  errorDiffusion: [
    [1, 0, 8],
    [2, 0, 4],
    [-2, 1, 2],
    [-1, 1, 4],
    [0, 1, 8],
    [1, 1, 4],
    [2, 1, 2],
  ],
  errorScale: 32,
};

const FloydSteinberg: Diffusion = {
  errorDiffusion: [
    [1, 0, 7],
    [-1, 1, 3],
    [0, 1, 5],
    [1, 1, 1],
  ],
  errorScale: 16,
};

const JarviceJudiceNinke: Diffusion = {
  errorDiffusion: [
    [1, 0, 7],
    [2, 0, 5],
    [-2, 1, 3],
    [-1, 1, 5],
    [0, 1, 7],
    [1, 1, 5],
    [2, 1, 3],
    [-1, 2, 3],
    [0, 2, 5],
    [1, 2, 3],
  ],
  errorScale: 46,
};

const Pigeon: Diffusion = {
  errorDiffusion: [
    [1, 0, 2],
    [2, 0, 1],
    [-1, 1, 2],
    [0, 1, 2],
    [1, 1, 2],
    [-2, 2, 1],
    [0, 2, 1],
    [2, 2, 1],
  ],
  errorScale: 14,
};

const Stucki: Diffusion = {
  errorDiffusion: [
    [1, 0, 8],
    [2, 0, 4],
    [-2, 1, 2],
    [-1, 1, 4],
    [0, 1, 8],
    [1, 1, 4],
    [2, 1, 2],
    [-2, 2, 1],
    [-1, 2, 2],
    [0, 2, 4],
    [1, 2, 2],
    [2, 2, 1],
  ],
  errorScale: 42,
};

const diffusionsByAlgorithm: { [key in Dithering]: Diffusion | null } = {
  [Dithering.None]: null,
  [Dithering.Atkinson]: Atkinson,
  [Dithering.Box]: Box,
  [Dithering.Burkes]: Burkes,
  [Dithering.FloydSteinberg]: FloydSteinberg,
  [Dithering.JarvisJudiceNinke]: JarviceJudiceNinke,
  [Dithering.Pigeon]: Pigeon,
  [Dithering.Stucki]: Stucki,
};

export function ditherImage(image: RawBWImage, algorithm: Dithering): RawBWImage {
  const diffusion: Diffusion | null = diffusionsByAlgorithm[algorithm];
  if (!diffusion) {
    return image;
  }
  const { errorDiffusion, errorScale } = diffusion;
  const data = Buffer.from(image.data);

  for (let i = 0; i < data.length; i++) {
    const x = i % image.width;
    const y = (i / image.width) | 0;
    const value = data[i] < 128 ? 0 : 255;
    const error = Math.floor(data[i] - value);

    for (const [dx, dy, di] of errorDiffusion) {
      const px = x + dx;
      const py = y + dy;
      const pidx = px + py * image.width;
      if (px >= 0 && px <= image.width - 1 && py >= 0 && py <= image.height - 1) {
        data[pidx] += error * (di / errorScale);
      }
    }
  }
  return { ...image, data };
}
