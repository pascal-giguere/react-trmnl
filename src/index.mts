import fs from "node:fs";
import { ditherImage, readImage, encodeBmp } from "./sharp.mjs";

const inputJpgImage = await readImage("in/rover_rgba.png");
const dithered = await ditherImage(inputJpgImage);
const bmpImage = encodeBmp(dithered);
fs.writeFileSync("out/output.bmp", bmpImage);
console.log("DONE");
