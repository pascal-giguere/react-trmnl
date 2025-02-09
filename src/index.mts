import process from "node:process";
import type { AddressInfo } from "net";
import env from "env-var";
import Fastify, { type FastifyInstance } from "fastify";
import { routes } from "./routes/routes.mjs";

const host: string = env.get("HOST").default("localhost").asString();
const port: number = env.get("PORT").default("3000").asPortNumber();

const server: FastifyInstance = Fastify();
server.register(routes, { prefix: "/api" });

try {
  await server.listen({ host, port });
  const address = server.server.address() as AddressInfo;
  console.log(`trmnl-react server listening on port ${address.port}`);
  console.log(`Preview at http://${host}:${address.port}/api/preview`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
