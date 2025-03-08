import React, { Fragment, type ReactElement, type ReactNode } from "react";
import { type FlexStyle } from "../layout/FlexStyle.mjs";

interface BoxProps {
  style: FlexStyle;
  children?: ReactNode;
}

const Box = ({ style, children }: BoxProps): ReactElement => {
  console.log(style);
  return <Fragment>{children}</Fragment>;
};

export const Yoga = (): ReactElement => {
  return (
    <Box style={{ width: 250, height: 475, padding: 10 }}>
      <Box style={{ flex: 1, rowGap: 10 }}>
        <Box style={{ height: 60 }} />
        <Box style={{ flex: 1, marginInline: 10 }} />
        <Box style={{ flex: 2, marginInline: 10 }} />
        <Box
          style={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            height: 64,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Box style={{ height: 40, width: 40 }} />
          <Box style={{ height: 40, width: 40 }} />
          <Box style={{ height: 40, width: 40 }} />
          <Box style={{ height: 40, width: 40 }} />
        </Box>
      </Box>
    </Box>
  );
};
