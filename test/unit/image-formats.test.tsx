import React, { type ReactElement } from "react";
import { render, Trmnl, Text, ImageFormat } from "../../src/index.mjs";

const WIDTH = 800;
const HEIGHT = 480;

const TestComponent = (): ReactElement => (
  <Trmnl width={WIDTH} height={HEIGHT}>
    <Text>Hello, world!</Text>
  </Trmnl>
);

it("renders a raw image with the appropriate size", async () => {
  const image: Buffer = await render(<TestComponent />, ImageFormat.Raw);
  expect(image).toHaveLength(WIDTH * HEIGHT); // 384 kB
});

it("renders a BMP image with the appropriate size", async () => {
  const BMP_HEADER_SIZE = 146;
  const image: Buffer = await render(<TestComponent />, ImageFormat.BMP);
  expect(image).toHaveLength((WIDTH * HEIGHT) / 8 + BMP_HEADER_SIZE); // 48 kB
});

it("renders a PNG image with the appropriate size", async () => {
  const image: Buffer = await render(<TestComponent />, ImageFormat.PNG);
  // PNG file size will vary depending on compressibility of the image. Expect a size in the 0-40 kB range.
  expect(image.length).toBeGreaterThan(0);
  expect(image.length).toBeLessThan(40000);
});
