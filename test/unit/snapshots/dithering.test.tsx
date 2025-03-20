import React from "react";
import { Trmnl, Box, Dithering, Image } from "../../../src/index.mjs";
import { expectSnapshotMatch } from "./utils.mjs";

it("applies different dithering algorithms to images", async () => {
  const baseStyle = { width: 400, height: 300 };

  await expectSnapshotMatch(
    <Trmnl width={800} height={1500}>
      <Box style={{ flexDirection: "row" }}>
        <Box>
          {/* All algos */}
          <Image src="https://picsum.photos/id/57/400/300" style={{ ...baseStyle, dithering: Dithering.None }} />
          <Image src="https://picsum.photos/id/57/400/300" style={{ ...baseStyle, dithering: Dithering.Atkinson }} />
          <Image src="https://picsum.photos/id/57/400/300" style={{ ...baseStyle, dithering: Dithering.Box }} />
          <Image src="https://picsum.photos/id/57/400/300" style={{ ...baseStyle, dithering: Dithering.Burkes }} />
          <Image
            src="https://picsum.photos/id/57/400/300"
            style={{ ...baseStyle, dithering: Dithering.FloydSteinberg }}
          />
          <Image
            src="https://picsum.photos/id/57/400/300"
            style={{ ...baseStyle, dithering: Dithering.JarvisJudiceNinke }}
          />
          <Image src="https://picsum.photos/id/57/400/300" style={{ ...baseStyle, dithering: Dithering.Pigeon }} />
          <Image src="https://picsum.photos/id/57/400/300" style={{ ...baseStyle, dithering: Dithering.Stucki }} />
        </Box>
        <Box>
          {/* Image downscale */}
          <Image src="https://picsum.photos/id/57/1200/900" style={{ ...baseStyle, dithering: Dithering.Atkinson }} />
          {/* Image upscale */}
          <Image src="https://picsum.photos/id/57/100/75" style={{ ...baseStyle, dithering: Dithering.Atkinson }} />
        </Box>
      </Box>
    </Trmnl>,
    "dithering.bmp",
  );
});
