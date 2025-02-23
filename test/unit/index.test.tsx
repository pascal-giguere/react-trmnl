import React, { type ReactElement, Fragment } from "react";
import { ImageFormat, render } from "../../src/index.mjs";

const TestComponent = (): ReactElement => <Fragment>Hello, world!</Fragment>;

it("renders a raw image with the appropriate size", async () => {
  const image: Buffer = await render(<TestComponent />, { width: 800, height: 480, format: ImageFormat.Raw });
  expect(image).toHaveLength(800 * 480);
});

it("renders an uncompressed bitmap image with the appropriate size", async () => {
  const image: Buffer = await render(<TestComponent />, { width: 800, height: 480, format: ImageFormat.BMP });
  expect(image).toHaveLength(48064);
});

it("renders a compressed PNG image with the appropriate size", async () => {
  const image: Buffer = await render(<TestComponent />, { width: 800, height: 480, format: ImageFormat.PNG });
  expect(image).toHaveLength(7101);
});
