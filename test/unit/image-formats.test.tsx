import React, { type ReactElement } from "react";
import { render, Text, ImageFormat } from "../../src/index.mjs";

const TestComponent = (): ReactElement => (
  <Text width={100} height={100}>
    Hello, world!
  </Text>
);
const DIMENSIONS = { width: 800, height: 480 };
const BMP_HEADER_SIZE = 64;

it("renders a raw image with the appropriate size", async () => {
  const image: Buffer = await render(<TestComponent />, { ...DIMENSIONS, format: ImageFormat.Raw });
  expect(image).toHaveLength(DIMENSIONS.width * DIMENSIONS.height); // 384 kB
});

it("renders a BMP image with the appropriate size", async () => {
  const image: Buffer = await render(<TestComponent />, { ...DIMENSIONS, format: ImageFormat.BMP });
  expect(image).toHaveLength((DIMENSIONS.width * DIMENSIONS.height) / 8 + BMP_HEADER_SIZE); // 48 kB
});

it("renders a PNG image with the appropriate size", async () => {
  const image: Buffer = await render(<TestComponent />, { ...DIMENSIONS, format: ImageFormat.PNG });
  // PNG file size will vary depending on compressibility of the image. Expect a size in the 0-40 kB range.
  expect(image.length).toBeGreaterThan(0);
  expect(image.length).toBeLessThan(40000);
});
