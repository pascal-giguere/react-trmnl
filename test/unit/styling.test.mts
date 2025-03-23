import { inheritStyle } from "../../src/styling/inheritance.mjs";
import type { BoxStyle, InheritedStyle, TextStyle } from "../../src/styling/types.mjs";
import { Color, DefaultFont } from "../../src/index.mjs";

it("applies inherited style properties", () => {
  const inheritedStyle: InheritedStyle = { color: Color.White, fontSize: 24, fontFamily: DefaultFont.Serif };

  const baseBoxStyle: BoxStyle = {
    color: "inherit",
    fontSize: 16,
    fontFamily: "inherit",
    backgroundColor: Color.Black,
    borderColor: Color.None,
    borderWidth: 0,
    borderRadius: 0,
  };

  const expectedBoxStyle: BoxStyle = {
    color: Color.White,
    fontSize: 16,
    fontFamily: DefaultFont.Serif,
    backgroundColor: Color.Black,
    borderColor: Color.None,
    borderWidth: 0,
    borderRadius: 0,
  };

  expect(inheritStyle(baseBoxStyle, inheritedStyle)).toEqual(expectedBoxStyle);

  const baseTextStyle: TextStyle = {
    color: "inherit",
    fontSize: 16,
    fontFamily: "inherit",
    borderColor: Color.None,
    borderWidth: 0,
  };

  const expectedTextStyle: TextStyle = {
    color: Color.White,
    fontSize: 16,
    fontFamily: DefaultFont.Serif,
    borderColor: Color.None,
    borderWidth: 0,
  };

  expect(inheritStyle(baseTextStyle, inheritedStyle)).toEqual(expectedTextStyle);
});
