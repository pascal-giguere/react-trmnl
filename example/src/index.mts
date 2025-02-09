import process from "node:process";
import type { AddressInfo } from "net";
import env from "env-var";
import Fastify from "fastify";
import { renderPNG } from "./App.js";

const host: string = env.get("HOST").default("localhost").asString();
const port: number = env.get("PORT").default("3000").asPortNumber();

const server = Fastify();

server.get("/", (_, rep) => rep.send({ message: "react-trmnl API" }));
server.get("/preview", async (_, rep) => {
  const png: Buffer = await renderPNG();
  rep
    .headers({
      "Cache-Control": "no-cache",
      "Content-Type": "image/png",
      "Content-Length": png.length.toString(),
    })
    .send(png);
});

try {
    await server.listen({ host, port });
    const address = server.server.address() as AddressInfo;
    console.log(`react-trmnl server listening on port ${address.port}`);
    console.log(`Preview at http://${host}:${address.port}/preview`);
} catch (err) {
    server.log.error(err);
    process.exit(1);
}
