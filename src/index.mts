import fs from "node:fs";
import { readImage } from "./renderer/dev-utils.mjs";
import { ditherImage } from "./renderer/dithering.mjs";
import { encodeBmp } from "./renderer/encoding.mjs";

const inputJpgImage = await readImage("in/rover_rgba.png");
const dithered = await ditherImage(inputJpgImage);
const bmpImage = encodeBmp(dithered);
fs.writeFileSync("out/output.bmp", bmpImage);
console.log("DONE");
