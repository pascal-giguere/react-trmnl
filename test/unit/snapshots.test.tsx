import React, { type ReactElement } from "react";
import { expectSnapshotMatch } from "./snapshots/utils.mjs";
import { Text } from "../../src/index.mjs";

const TestComponent = (): ReactElement => (
  <Text width={100} height={100}>
    Hello, world!
  </Text>
);

it("renders React code matching snapshots", async () => {
  await expectSnapshotMatch(<TestComponent />, "test.bmp");
});
