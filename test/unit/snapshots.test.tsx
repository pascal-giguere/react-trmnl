import React from "react";
import { Box, Color, Text } from "../../src/index.mjs";
import { expectSnapshotMatch } from "./snapshots/utils.mjs";

it("renders React code matching snapshots", async () => {
  await expectSnapshotMatch(
    <Box width={200} height={100} backgroundColor={Color.Black}>
      <Box width={100} height={50} backgroundColor={Color.White}>
        <Text width={500} height={100} left={50} borderColor={Color.White}>
          Hello, world!
        </Text>
      </Box>
    </Box>,
    "test.bmp",
  );
});
