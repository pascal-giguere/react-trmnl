import React from "react";
import { Box, Color, Image, Text } from "../../src/index.mjs";
import { expectSnapshotMatch } from "./snapshots/utils.mjs";
import { Dithering } from "../../src/rendering/dithering.mjs";
import { flowersJpg } from "./assets/paths.mjs";

it("renders React code matching snapshots", async () => {
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
      <Image src="https://picsum.photos/id/0/300/200" width={240} height={160} left={560} dithering={Dithering.None} />
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
    "test.bmp",
  );
});

it("renders React code matching snapshots - Dithering bug", async () => {
  await expectSnapshotMatch(
    <Box width={800} height={480}>
      <Image src="https://picsum.photos/id/0/300/200" width={300} height={200} />
      <Image src="https://picsum.photos/id/0/300/200" width={301} height={200} top={200} />
      <Image src="https://picsum.photos/id/0/400/240" width={400} height={240} left={300} />
      <Image src="https://picsum.photos/id/0/300/200" width={400} height={240} left={300} top={240} />
    </Box>,
    "dithering-bug.bmp",
  );
});
