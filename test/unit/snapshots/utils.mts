import { join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import type { ReactElement } from "react";
import { readFileData } from "../../../src/loading/filesystem.mjs";
import { ImageFormat, render } from "../../../src/index.mjs";

const snapshotPath: string = join(process.cwd(), "/test/unit/snapshots/");
const expectedPath: string = join(snapshotPath, "/expected/");
const actualPath: string = join(snapshotPath, "/actual/");

export async function expectSnapshotMatch(element: ReactElement, snapshotFilename: string): Promise<void> {
  const rendered: Buffer = await render(element, ImageFormat.BMP);
  await writeSnapshotData(snapshotFilename, rendered);
  const expected: Buffer = await readSnapshotData(snapshotFilename);
  expect(rendered.toString("base64")).toEqual(expected.toString("base64"));
}

async function readSnapshotData(filename: string): Promise<Buffer> {
  return readFileData(join(expectedPath, filename));
}

async function writeSnapshotData(filename: string, data: Buffer): Promise<void> {
  await mkdir(actualPath, { recursive: true });
  await writeFile(join(actualPath, filename), data);
}
