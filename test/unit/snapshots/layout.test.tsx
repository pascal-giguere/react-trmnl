import React from "react";
import { Box, Color } from "../../../src/index.mjs";
import { expectSnapshotMatch } from "./utils.mjs";

it("positions element with flexbox", async () => {
  const outputDimensions = { width: 800, height: 480 };

  await expectSnapshotMatch(
    <Box style={{ ...outputDimensions, flexDirection: "row" }}>
      <Box style={{ flex: 1, backgroundColor: Color.Black }} />
      <Box style={{ flex: 1 }} />
    </Box>,
    outputDimensions,
    "layout.bmp",
  );
});
