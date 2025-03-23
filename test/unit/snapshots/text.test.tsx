import React from "react";
import { Box, Color, Text, Trmnl } from "../../../src/index.mjs";
import { expectSnapshotMatch } from "./utils.mjs";

it("renders the <Text> component", async () => {
  await expectSnapshotMatch(
    <Trmnl width={560} height={480} style={{ flexDirection: "column" }}>
      <Box
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Color.White,
          padding: 25,
        }}
      >
        <Box style={{ flex: 1 }}>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
        </Box>
        <Box style={{ flex: 1 }}>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
        </Box>
      </Box>
      <Box
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          color: Color.White,
          backgroundColor: Color.Black,
          padding: 25,
        }}
      >
        <Box style={{ flex: 1 }}>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
        </Box>
        <Box style={{ flex: 1 }}>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
          <Text>Lorem ipsum</Text>
        </Box>
      </Box>
    </Trmnl>,
    "text.bmp",
  );
});
