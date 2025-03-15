import { join } from "node:path";

const assetsPath: string = join(process.cwd(), "/test/unit/assets/");

export const flowersJpg: string = join(assetsPath, "flowers.jpg");
export const checkerboardBmp: string = join(assetsPath, "checkerboard.bmp");
