import React, { type ReactElement, Fragment } from "react";
import { render } from "../../src/index.mjs";

const TestComponent = (): ReactElement => <Fragment>Hello, world!</Fragment>;

it("basic test", async () => {
  const image: Buffer = await render(<TestComponent />);
  expect(image).toHaveLength(0);
});
