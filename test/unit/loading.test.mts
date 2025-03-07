import { fetchImage } from "../../src/loading/network.mjs";
import type { RawImage } from "../../src/rendering/types.mjs";

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 200;
const IMAGE_CHANNELS = 3;

it("loads an image from network", async () => {
  const image: RawImage = await fetchImage(`https://picsum.photos/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`);
  expect(image.width).toBe(IMAGE_WIDTH);
  expect(image.height).toBe(IMAGE_HEIGHT);
  expect(image.data).toHaveLength(IMAGE_WIDTH * IMAGE_HEIGHT * IMAGE_CHANNELS);
});
