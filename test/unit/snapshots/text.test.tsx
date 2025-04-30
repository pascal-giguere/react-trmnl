import React from "react";
import { Box, Color, Text, Trmnl } from "../../../src/index.mjs";
import { expectSnapshotMatch } from "./utils.mjs";

it("renders the <Text> component", async () => {
  await expectSnapshotMatch(
    <Trmnl width={800} height={480} style={{ flexDirection: "column" }}>
      <Box
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Color.White,
          padding: 25,
        }}
      >
        <Box style={{ flex: 1, color: Color.Black }}>
          <Text style={{ fontSize: 10 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 14 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 18 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 32 }}>Lorem ipsum</Text>
        </Box>
        <Box style={{ flex: 1, color: Color.White }}>
          <Text style={{ fontSize: 10, borderColor: Color.Black, borderWidth: 1 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 14, borderColor: Color.Black, borderWidth: 1 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 18, borderColor: Color.Black, borderWidth: 1 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 32, borderColor: Color.Black, borderWidth: 2 }}>Lorem ipsum</Text>
        </Box>
        <Box style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, color: Color.Black }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
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
        <Box style={{ flex: 1, color: Color.White }}>
          <Text style={{ fontSize: 10 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 14 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 18 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 32 }}>Lorem ipsum</Text>
        </Box>
        <Box style={{ flex: 1, color: Color.Black }}>
          <Text style={{ fontSize: 10, borderColor: Color.White, borderWidth: 1 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 14, borderColor: Color.White, borderWidth: 1 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 18, borderColor: Color.White, borderWidth: 1 }}>Lorem ipsum</Text>
          <Text style={{ fontSize: 32, borderColor: Color.White, borderWidth: 2 }}>Lorem ipsum</Text>
        </Box>
        <Box style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, color: Color.White }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
        </Box>
      </Box>
    </Trmnl>,
    "text.bmp",
  );
});
