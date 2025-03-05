import { join } from "node:path";
import { promises } from "node:fs";
import type { RawImage } from "../../../src/renderer/types.mjs";
import { readImage } from "../../../src/renderer/filesystem.js";

const snapshotPath: string = join(process.cwd(), "/test/unit/snapshots/");
const expectedPath: string = join(snapshotPath, "/expected/");
const actualPath: string = join(snapshotPath, "/actual/");

export async function readSnapshotData(filename: string): Promise<Buffer> {
  const image: RawImage = await readImage(join(expectedPath, filename));
  return image.data;
}

export async function writeSnapshotData(filename: string, data: Buffer): Promise<void> {
  await promises.mkdir(actualPath, { recursive: true });
  await promises.writeFile(join(actualPath, filename), data);
}
