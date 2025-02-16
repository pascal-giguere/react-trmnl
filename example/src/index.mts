import process from "node:process";
import type { AddressInfo } from "net";
import Fastify from "fastify";
import { renderApp } from "./App.js";

const host: string = process.env.HOST ?? "localhost";
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const server = Fastify();

server.get("/", (_, rep) => rep.send({ message: "react-trmnl API" }));
server.get("/preview", async (_, rep) => {
  const png: Buffer = await renderApp();
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
