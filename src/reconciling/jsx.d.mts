import type { RootProps, TextProps, BoxProps, ImageProps } from "./types.mjs";
import type { TrmnlElement } from "./host.mjs";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      [TrmnlElement.Root]: RootProps;
      [TrmnlElement.Text]: TextProps;
      [TrmnlElement.Box]: BoxProps;
      [TrmnlElement.Image]: ImageProps;
    }
  }
}
