import process from "node:process";
import type { AddressInfo } from "net";
import env from "env-var";
import Fastify, { type FastifyInstance } from "fastify";
import { routes } from "./routes/routes.mjs";

const serverPort: number = env.get("PORT").default("3000").asPortNumber();
const server: FastifyInstance = Fastify();
server.register(routes, { prefix: "/api" });

try {
  await server.listen({ port: serverPort });
  const port: number = (server.server.address() as AddressInfo).port;
  console.log(`trmnl-react server listening on port ${port}`);
  console.log(`Preview at http://localhost:${port}/api/preview`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
