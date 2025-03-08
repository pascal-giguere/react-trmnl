import { flowersJpg } from "./assets/paths.mjs";
import { readImage } from "../../src/loading/filesystem.mjs";
import { fetchImage } from "../../src/loading/network.mjs";
import type { RawImage } from "../../src/rendering/types.mjs";

it("loads an image from the local filesystem", async () => {
  const WIDTH = 2592,
    HEIGHT = 1728,
    CHANNELS = 3;
  const image: RawImage = await readImage(flowersJpg);
  expect(image.width).toBe(WIDTH);
  expect(image.height).toBe(HEIGHT);
  expect(image.data).toHaveLength(WIDTH * HEIGHT * CHANNELS);
});

it("loads an image from the network", async () => {
  const WIDTH = 300,
    HEIGHT = 200,
    CHANNELS = 3;
  // TODO mock fetch response
  const image: RawImage = await fetchImage(`https://picsum.photos/${WIDTH}/${HEIGHT}`);
  expect(image.width).toBe(WIDTH);
  expect(image.height).toBe(HEIGHT);
  expect(image.data).toHaveLength(WIDTH * HEIGHT * CHANNELS);
});
