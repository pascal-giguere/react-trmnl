import React, { type ReactElement } from "react";
import { Box, Color, Image, render, Text } from "react-trmnl";

const App = (): ReactElement => {
  return (
    <Box left={20} top={50} width={400} height={200} backgroundColor={Color.White} borderColor={Color.Black}>
      <Text width={400} height={200}>
        Hello, world!
      </Text>
      <Image src="https://picsum.photos/id/0/400/240" width={400} height={240} left={400} />
    </Box>
  );
};

export const renderApp = () => render(<App />);
