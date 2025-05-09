import Fastify from "fastify";
import React from "react";
import { render, ImageFormat } from "react-trmnl";
import { App } from "./App.js";

const host: string = process.env.HOST ?? "localhost";
const port: number = Number.isInteger(process.env.PORT) ? Number(process.env.PORT) : 3000;
const server = Fastify();

server.get("/display", async (_, rep) => {
  const png: Buffer = await render(<App />, ImageFormat.PNG);
  rep.headers({ "Cache-Control": "no-cache", "Content-Type": "image/png" }).send(png);
});

await server.listen({ host, port });
console.log(`Preview your react-trmnl app: http://${host}:${port}/display`);
