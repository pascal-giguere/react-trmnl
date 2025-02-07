import fs from "node:fs";
import { readImage } from "./renderer/dev-utils.mjs";
import { encodeBMP, encodePNG } from "./renderer/encoding.mjs";
import { to1Bit } from "./renderer/conversions.mjs";

const inputJpgImage = await readImage("in/rover_rgba.png");
console.time("to1Bit");
const dithered = await to1Bit(inputJpgImage, false);
console.timeEnd("to1Bit");
console.time("encodeBMP");
const bmpImage = encodeBMP(dithered);
console.timeEnd("encodeBMP");
fs.writeFileSync("out/output.bmp", bmpImage);
console.time("encodePNG");
const pngImage = await encodePNG(dithered);
console.timeEnd("encodePNG");
fs.writeFileSync("out/output.png", pngImage);
console.log("DONE");
