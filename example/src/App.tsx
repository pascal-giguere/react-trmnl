import React, { type ReactElement } from "react";
import { render } from "react-trmnl";

const App = (): ReactElement => {
  return <text>Hello, world!</text>;
};

export const renderApp = () => render(<App />);
