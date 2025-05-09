import React, { type ReactElement } from "react";
import { Trmnl, Box, Image, Text, Color, DefaultFont, Dithering } from "react-trmnl";

export const App = (): ReactElement => (
  <Trmnl style={{ flex: 1, flexDirection: "row", padding: 20 }}>
    <Box
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: Color.Black,
      }}
    >
      <Image
        src="https://picsum.photos/id/57/320/280"
        style={{ width: 320, height: 280, margin: 35, dithering: Dithering.Atkinson }}
      />
      <Text
        style={{
          height: 35,
          width: 300,
          margin: "auto",
          marginTop: 10,
          fontFamily: DefaultFont.Sans,
          borderColor: Color.White,
          borderWidth: 1,
          fontSize: 32,
        }}
      >
        Hello, react-trmnl!
      </Text>
    </Box>
    <Box
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
        backgroundColor: Color.White,
      }}
    >
      <Box style={{ height: 70, width: 70, backgroundColor: Color.Black }} />
      <Box
        style={{
          height: 70,
          width: 70,
          backgroundColor: Color.White,
          borderColor: Color.Black,
          borderWidth: 3,
          borderRadius: 70,
        }}
      />
    </Box>
  </Trmnl>
);
