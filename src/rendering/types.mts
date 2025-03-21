export type RawImage = {
  width: number;
  height: number;
  channels: 1 | 2 | 3 | 4;
  data: Buffer;
};

export type RawBWImage = RawImage & { channels: 1 };

export type RenderingDimensions = {
  width: number;
  height: number;
};

export type RenderingPosition = {
  top: number;
  left: number;
};
