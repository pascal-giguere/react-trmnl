import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getPreview } from "./preview.mjs";

export const routes = (instance: FastifyInstance): void => {
  instance.get("/", getRoot);
  instance.get("/preview", getPreview);
};

function getRoot(_: FastifyRequest, rep: FastifyReply): void {
  rep.send({ message: "react-trmnl API" });
}
