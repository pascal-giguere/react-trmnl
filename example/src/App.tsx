import React, { type ReactElement } from "react";
import { Box, Color, Image, render, Text } from "react-trmnl";

const App = (): ReactElement => {
  return (
    <Box
      style={{
        marginLeft: 20,
        marginTop: 50,
        width: 400,
        height: 200,
        borderWidth: 1,
      }}
    >
      <Text style={{ width: 400, height: 200, color: Color.Black }}>Hello, world!</Text>
      <Image src="https://picsum.photos/id/0/400/240" style={{ width: 400, height: 200, marginLeft: 400 }} />
    </Box>
  );
};

export const renderApp = () => render(<App />);
