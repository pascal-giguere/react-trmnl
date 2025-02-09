import React, { type ReactElement } from "react";

export const Text = ({ children }: { children: string }): ReactElement => {
  console.log(children);
  return <text>{children}</text>;
};
