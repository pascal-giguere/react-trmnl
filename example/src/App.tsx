import React, { Fragment, type ReactElement } from "react";
import { render, ImageFormat } from "react-trmnl";

const App = (): ReactElement => {
  return <Fragment>Hello, world!</Fragment>;
};

export async function renderPNG(): Promise<Buffer> {
  return render(<App />, { width: 800, height: 480, format: ImageFormat.PNG });
}
