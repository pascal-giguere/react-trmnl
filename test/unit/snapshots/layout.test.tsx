import React from "react";
import { Box, Color, Trmnl } from "../../../src/index.mjs";
import { expectSnapshotMatch } from "./utils.mjs";

it("positions element with flexbox", async () => {
  await expectSnapshotMatch(
    <Trmnl width={800} height={480}>
      <Box style={{ flex: 1, flexDirection: "row" }}>
        <Box style={{ flex: 1, backgroundColor: Color.Black }} />
        <Box style={{ flex: 1 }} />
      </Box>
    </Trmnl>,
    "layout.bmp",
  );
});
