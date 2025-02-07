import fs from "node:fs";
import { readImage } from "./renderer/dev-utils.mjs";
import { encodeBMP, encodePNG } from "./renderer/encoding.mjs";
import { oneBit } from "./renderer/transforms.mjs";

const inputJpgImage = await readImage("in/rover_bw.jpg");
console.time("oneBitImage");
const dithered = await oneBit(inputJpgImage, true);
console.timeEnd("oneBitImage");
console.time("encodeBMP");
const bmpImage = encodeBMP(dithered);
console.timeEnd("encodeBMP");
fs.writeFileSync("out/output.bmp", bmpImage);
console.time("encodePNG");
const pngImage = await encodePNG(dithered);
console.timeEnd("encodePNG");
fs.writeFileSync("out/output.png", pngImage);
console.log("DONE");
