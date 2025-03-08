import path from "node:path";

const assetsPath: string = path.join(process.env.PROJECT_CWD!, "/test/unit/assets");

export const flowersJpg: string = path.join(assetsPath, "flowers.jpg");
