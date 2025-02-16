import React, { Fragment, type ReactElement } from "react";
import { render } from "react-trmnl";

const App = (): ReactElement => {
  return <Fragment>Hello, world!</Fragment>;
};

export const renderApp = () => render(<App />);
