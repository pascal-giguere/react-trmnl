declare module "fast-bmp" {
  function encode(options: {
    width: number;
    height: number;
    data: Uint8Array;
    bitDepth: 1;
    components: 1;
    channels: 1;
  }): Uint8Array;
}
