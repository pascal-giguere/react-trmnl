import fs from "node:fs";
import { readImage } from "./renderer/dev-utils.mjs";
import { encodeBmp } from "./renderer/encoding.mjs";
import { to1BitBW } from "./renderer/dithering.mjs";

const inputJpgImage = await readImage("in/rover_rgba.png");
const dithered = await to1BitBW(inputJpgImage, true);
const bmpImage = encodeBmp(dithered);
fs.writeFileSync("out/output.bmp", bmpImage);
console.log("DONE");
