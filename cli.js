#!/usr/bin/env node

import { downloadTemplate } from "giget";
import path from "node:path";

const { source, dir } = await downloadTemplate("github:jeasx/quickstart", {
  install: true,
  dir: process.argv[2],
});

const target = path.relative(process.cwd(), dir);

console.info(
  `\n✅ Extracted \x1b[35m${source}\x1b[0m into \x1b[35m${target}\x1b[0m.`,
  `\n🚀 To start development: \x1b[33mcd ${target} && npm run build && npm run dev\x1b[0m`
);
