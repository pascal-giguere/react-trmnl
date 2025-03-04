import React, { type ReactElement } from "react";
import { render, Box, Text, Image, Color } from "react-trmnl";

const App = (): ReactElement => {
  return (
    <Box left={20} top={50} width={400} height={200} backgroundColor={Color.White} borderColor={Color.Black}>
      <Text width={400} height={200}>
        Hello, world!
      </Text>
      <Image src="foo.png" width={400} height={200} />
    </Box>
  );
};

export const renderApp = () => render(<App />);
