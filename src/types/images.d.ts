type RawImage = {
  width: number;
  height: number;
  channels: 1 | 2 | 3 | 4;
  data: Buffer;
};

type RawBWImage = RawImage & { channels: 1 };
type RawBWAImage = RawImage & { channels: 2 };
type RawRGBImage = RawImage & { channels: 3 };
type RawRGBAImage = RawImage & { channels: 4 };
