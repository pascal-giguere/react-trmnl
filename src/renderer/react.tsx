import React from "react";
import { App } from "../components/App.js";
import { ReconcilerRoot } from "../reconciler/root.mjs";
import type { RawBWImage } from "./types.mjs";

const root = new ReconcilerRoot({ width: 800, height: 480 });

export async function renderReact(): Promise<RawBWImage> {
  await root.render(<App />);
  return root.getRawImage();
}
