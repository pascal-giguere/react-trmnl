import React from "react";
import { Box, Color, Trmnl } from "../../../src/index.mjs";
import { expectSnapshotMatch } from "./utils.mjs";

it("renders the <Box> component", async () => {
  await expectSnapshotMatch(
    <Trmnl width={560} height={480} style={{ flexDirection: "column" }}>
      <Box
        style={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: Color.White,
          padding: 25,
        }}
      >
        <Box
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box style={{ height: 50, width: 50, backgroundColor: Color.Black }} />
          <Box
            style={{ height: 50, width: 50, backgroundColor: Color.Black, borderColor: Color.White, borderWidth: 5 }}
          />
          <Box
            style={{ height: 50, width: 50, backgroundColor: Color.White, borderColor: Color.Black, borderWidth: 1 }}
          />
          <Box
            style={{ height: 50, width: 50, backgroundColor: Color.None, borderColor: Color.Black, borderWidth: 2 }}
          />
          <Box
            style={{ height: 50, width: 50, backgroundColor: Color.White, borderColor: Color.Black, borderWidth: 4 }}
          />
          <Box
            style={{ height: 50, width: 50, backgroundColor: Color.White, borderColor: Color.Black, borderWidth: 10 }}
          />
          <Box
            style={{ height: 35, width: 65, backgroundColor: Color.White, borderColor: Color.Black, borderWidth: 10 }}
          />
        </Box>
        <Box
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box style={{ height: 50, width: 50, backgroundColor: Color.Black, borderRadius: 10 }} />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.Black,
              borderColor: Color.White,
              borderWidth: 5,
              borderRadius: 10,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.White,
              borderColor: Color.Black,
              borderWidth: 1,
              borderRadius: 10,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.None,
              borderColor: Color.Black,
              borderWidth: 2,
              borderRadius: 10,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.White,
              borderColor: Color.Black,
              borderWidth: 4,
              borderRadius: 10,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.White,
              borderColor: Color.Black,
              borderWidth: 10,
              borderRadius: 10,
            }}
          />
          <Box
            style={{
              height: 35,
              width: 65,
              backgroundColor: Color.White,
              borderColor: Color.Black,
              borderWidth: 10,
              borderRadius: 10,
            }}
          />
        </Box>
        <Box
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box style={{ height: 50, width: 50, backgroundColor: Color.Black, borderRadius: 25 }} />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.Black,
              borderColor: Color.White,
              borderWidth: 5,
              borderRadius: 25,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.White,
              borderColor: Color.Black,
              borderWidth: 1,
              borderRadius: 25,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.None,
              borderColor: Color.Black,
              borderWidth: 2,
              borderRadius: 25,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.White,
              borderColor: Color.Black,
              borderWidth: 4,
              borderRadius: 25,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.White,
              borderColor: Color.Black,
              borderWidth: 10,
              borderRadius: 25,
            }}
          />
          <Box
            style={{
              height: 35,
              width: 65,
              backgroundColor: Color.White,
              borderColor: Color.Black,
              borderWidth: 10,
              borderRadius: 25,
            }}
          />
        </Box>
      </Box>
      <Box
        style={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: Color.Black,
          padding: 25,
        }}
      >
        <Box
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box style={{ height: 50, width: 50, backgroundColor: Color.White }} />
          <Box
            style={{ height: 50, width: 50, backgroundColor: Color.White, borderColor: Color.Black, borderWidth: 5 }}
          />
          <Box
            style={{ height: 50, width: 50, backgroundColor: Color.Black, borderColor: Color.White, borderWidth: 1 }}
          />
          <Box
            style={{ height: 50, width: 50, backgroundColor: Color.None, borderColor: Color.White, borderWidth: 2 }}
          />
          <Box
            style={{ height: 50, width: 50, backgroundColor: Color.Black, borderColor: Color.White, borderWidth: 4 }}
          />
          <Box
            style={{ height: 50, width: 50, backgroundColor: Color.Black, borderColor: Color.White, borderWidth: 10 }}
          />
          <Box
            style={{ height: 35, width: 65, backgroundColor: Color.Black, borderColor: Color.White, borderWidth: 10 }}
          />
        </Box>
        <Box
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box style={{ height: 50, width: 50, backgroundColor: Color.White, borderRadius: 10 }} />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.White,
              borderColor: Color.Black,
              borderWidth: 5,
              borderRadius: 10,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.Black,
              borderColor: Color.White,
              borderWidth: 1,
              borderRadius: 10,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.None,
              borderColor: Color.White,
              borderWidth: 2,
              borderRadius: 10,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.Black,
              borderColor: Color.White,
              borderWidth: 4,
              borderRadius: 10,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.Black,
              borderColor: Color.White,
              borderWidth: 10,
              borderRadius: 10,
            }}
          />
          <Box
            style={{
              height: 35,
              width: 65,
              backgroundColor: Color.Black,
              borderColor: Color.White,
              borderWidth: 10,
              borderRadius: 10,
            }}
          />
        </Box>
        <Box
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box style={{ height: 50, width: 50, backgroundColor: Color.White, borderRadius: 25 }} />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.White,
              borderColor: Color.Black,
              borderWidth: 5,
              borderRadius: 25,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.Black,
              borderColor: Color.White,
              borderWidth: 1,
              borderRadius: 25,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.None,
              borderColor: Color.White,
              borderWidth: 2,
              borderRadius: 25,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.Black,
              borderColor: Color.White,
              borderWidth: 4,
              borderRadius: 25,
            }}
          />
          <Box
            style={{
              height: 50,
              width: 50,
              backgroundColor: Color.Black,
              borderColor: Color.White,
              borderWidth: 10,
              borderRadius: 25,
            }}
          />
          <Box
            style={{
              height: 35,
              width: 65,
              backgroundColor: Color.Black,
              borderColor: Color.White,
              borderWidth: 10,
              borderRadius: 25,
            }}
          />
        </Box>
      </Box>
    </Trmnl>,
    "box.bmp",
  );
});
