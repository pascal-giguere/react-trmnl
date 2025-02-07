type RawImage = {
  width: number;
  height: number;
  channels: 1 | 2 | 3 | 4;
  data: Buffer;
};

type RawBWImage = RawImage & { channels: 1 };
