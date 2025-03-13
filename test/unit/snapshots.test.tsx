import React from "react";
import { Box, Color, Image, Text } from "../../src/index.mjs";
import { expectSnapshotMatch } from "./snapshots/utils.mjs";
import { Dithering } from "../../src/rendering/dithering.mjs";
import { flowersJpg } from "./assets/paths.mjs";

describe("Snapshot tests", () => {
  it("renders React code matching snapshot", async () => {
    const DIMENSIONS = { width: 800, height: 480 };
    await expectSnapshotMatch(
      <Box width={300} height={200} left={100} top={50} backgroundColor={Color.Black}>
        <Box width={30} height={30} backgroundColor={Color.Black} />
        <Box width={200} height={100} left={100} top={70} backgroundColor={Color.White} borderColor={Color.Black}>
          <Text width={500} height={100} left={320} top={100} fontSize={24} borderColor={Color.White}>
            Hello, world!
          </Text>
        </Box>
        <Box
          width={150}
          height={150}
          left={100}
          top={300}
          backgroundColor={Color.White}
          borderColor={Color.Black}
          borderWidth={10}
          borderRadius={20}
        />
        <Box
          width={150}
          height={150}
          left={300}
          top={300}
          backgroundColor={Color.White}
          borderColor={Color.Black}
          borderWidth={10}
          borderRadius={1000}
        />
        <Box width={80} height={80} top={100} left={250} borderColor={Color.White} borderWidth={1} borderRadius={10} />
        <Box width={130} height={130} top={30} left={30} borderWidth={4} />
        <Image
          src="https://picsum.photos/id/0/300/200"
          width={240}
          height={160}
          left={560}
          dithering={Dithering.None}
        />
        <Image
          src="https://picsum.photos/id/0/300/200"
          width={240}
          height={160}
          top={160}
          left={560}
          dithering={Dithering.Atkinson}
        />
        <Image src={flowersJpg} width={240} height={160} top={320} left={560} dithering={Dithering.Atkinson} />
      </Box>,
      DIMENSIONS,
      "test.bmp",
    );
  });

  it("applies different dithering algorithms to images", async () => {
    const DIMENSIONS = { width: 800, height: 1500 };
    await expectSnapshotMatch(
      <Box width={0} height={0}>
        <Image src="https://picsum.photos/id/0/400/300" width={400} height={300} top={0} dithering={Dithering.None} />
        <Image
          src="https://picsum.photos/id/0/400/300"
          width={400}
          height={300}
          top={300}
          dithering={Dithering.Atkinson}
        />
        <Image src="https://picsum.photos/id/0/400/300" width={400} height={300} top={600} dithering={Dithering.Box} />
        <Image
          src="https://picsum.photos/id/0/400/300"
          width={400}
          height={300}
          top={900}
          dithering={Dithering.Burkes}
        />
        <Image
          src="https://picsum.photos/id/0/400/300"
          width={400}
          height={300}
          left={400}
          top={0}
          dithering={Dithering.FloydSteinberg}
        />
        <Image
          src="https://picsum.photos/id/0/400/300"
          width={400}
          height={300}
          left={400}
          top={300}
          dithering={Dithering.JarvisJudiceNinke}
        />
        <Image
          src="https://picsum.photos/id/0/400/300"
          width={400}
          height={300}
          left={400}
          top={600}
          dithering={Dithering.Pigeon}
        />
        <Image
          src="https://picsum.photos/id/0/400/300"
          width={400}
          height={300}
          left={400}
          top={900}
          dithering={Dithering.Stucki}
        />
        {/* Image downscale */}
        <Image
          src="https://picsum.photos/id/0/600/450"
          width={400}
          height={300}
          top={1200}
          dithering={Dithering.Atkinson}
        />
        {/* Image upscale */}
        <Image
          src="https://picsum.photos/id/0/300/225"
          width={400}
          height={300}
          top={1200}
          left={400}
          dithering={Dithering.Atkinson}
        />
      </Box>,
      DIMENSIONS,
      "dithering.bmp",
    );
  });
});
