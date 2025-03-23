import type { BoxStyle, InheritedStyle, TextStyle } from "./types.mjs";

export function inheritStyle<T extends BoxStyle | TextStyle>(style: T, inheritedStyle: InheritedStyle): T {
  return Object.keys(style).reduce(
    (acc: T, key: string) =>
      style[key as keyof T] === "inherit"
        ? ({ ...acc, [key]: inheritedStyle[key as keyof InheritedStyle] } as T)
        : ({ ...acc, [key]: style[key as keyof T] } as T),
    {} as T,
  );
}
