process.env.PANGOCAIRO_BACKEND = "fontconfig";

export type Font = DefaultFont | VectorFont | BitmapFont;

export enum DefaultFont {
  Sans = "sans",
  Serif = "serif",
  Monospace = "monospace",
}

export enum VectorFont {
  EBGaramond = "EB Garamond",
  Inter = "Inter",
}

export enum BitmapFont {}

export function isDefaultFont(font: Font): font is DefaultFont {
  return Object.values(DefaultFont).includes(font as DefaultFont);
}
