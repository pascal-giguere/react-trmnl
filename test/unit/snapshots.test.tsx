import React from "react";
import { Box, Color } from "../../src/index.mjs";
import { expectSnapshotMatch } from "./snapshots/utils.mjs";

it("renders React code matching snapshots", async () => {
  await expectSnapshotMatch(<Box width={200} height={100} backgroundColor={Color.Black} />, "test.bmp");
});
