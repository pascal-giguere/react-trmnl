import React from "react";
import { Box, Color, Text } from "../../src/index.mjs";
import { expectSnapshotMatch } from "./snapshots/utils.mjs";

it("renders React code matching snapshots", async () => {
  await expectSnapshotMatch(
    <Box width={300} height={200} left={100} top={50} backgroundColor={Color.Black}>
      <Box width={200} height={100} left={100} top={70} backgroundColor={Color.White} borderColor={Color.Black}>
        <Text width={500} height={100} left={320} top={100} fontSize={24} borderColor={Color.White}>
          Hello, world!
        </Text>
      </Box>
      <Box
        width={150}
        height={150}
        left={300}
        top={300}
        backgroundColor={Color.White}
        borderColor={Color.Black}
        borderWidth={10}
        borderRadius={20}
      />
      <Box
        width={150}
        height={150}
        left={500}
        top={300}
        backgroundColor={Color.White}
        borderColor={Color.Black}
        borderWidth={10}
        borderRadius={1000}
      />
    </Box>,
    "test.bmp",
  );
});
