import type { TextProps, BoxProps, ImageProps } from "./reconciler/types.mjs";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "trmnl-text": TextProps;
      "trmnl-box": BoxProps;
      "trmnl-image": ImageProps;
    }
  }
}
