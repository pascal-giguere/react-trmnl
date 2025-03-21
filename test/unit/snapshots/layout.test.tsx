import React from "react";
import { Box, Color, Trmnl } from "../../../src/index.mjs";
import { expectSnapshotMatch } from "./utils.mjs";

it("positions element with flexbox", async () => {
  await expectSnapshotMatch(
    <Trmnl width={800} height={480} style={{ flex: 1, flexDirection: "row" }}>
      <Box style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 50, backgroundColor: Color.Black }}>
        <Box style={{ height: 50, width: 50, backgroundColor: Color.White }} />
        <Box style={{ height: 50, width: 50, backgroundColor: Color.White }} />
      </Box>
      <Box style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 50, backgroundColor: Color.White }}>
        <Box style={{ height: 50, width: 50, backgroundColor: Color.Black }} />
        <Box style={{ height: 50, width: 50, backgroundColor: Color.Black }} />
      </Box>
    </Trmnl>,
    "layout.bmp",
  );
});
