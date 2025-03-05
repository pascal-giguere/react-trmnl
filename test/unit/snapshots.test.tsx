import React, { type ReactElement } from "react";
import { Box, Color, ImageFormat, render } from "../../src/index.mjs";
import { readSnapshotData, writeSnapshotData } from "./snapshots/utils.mjs";

const DIMENSIONS = { width: 800, height: 480 };

it("renders React code matching snapshots", async () => {
  const snapshotFilename: string = "test.bmp";
  const TestComponent = (): ReactElement => <Box width={200} height={100} backgroundColor={Color.Black} />;
  const rendered: Buffer = await render(<TestComponent />, { ...DIMENSIONS, format: ImageFormat.BMP });
  await writeSnapshotData(snapshotFilename, rendered);
  const expected: Buffer = await readSnapshotData(snapshotFilename);
  expect(rendered).toEqual(expected);
});
