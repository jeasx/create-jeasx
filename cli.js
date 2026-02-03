#!/usr/bin/env node

import { Command } from "commander";
import { downloadTemplate } from "giget";
import fs from "node:fs";
import path from "node:path";

await new Command()
  .name("create-jeasx")
  .description("Bootstrap a Jeasx project.")
  .argument("[name]", "target directory", "jeasx-quickstart")
  .option("--with-vercel", "install with Vercel support")
  .option("--with-docker", "install with Docker support")
  .option("-f,--force", "force installation, overwrite target directory")
  .action(async (name, { force, withVercel, withDocker }) => {
    try {
      const { source, dir } = await downloadTemplate("github:jeasx/quickstart", {
        install: true,
        force: force,
        dir: name,
      });

      const target = path.relative(process.cwd(), dir);

      const resourcesToRemove = [];
      if (withDocker === undefined) {
        resourcesToRemove.push("Dockerfile", ".dockerignore");
      }
      if (withVercel === undefined) {
        resourcesToRemove.push("api", "vercel.json");
      }
      resourcesToRemove.forEach((pathname) =>
        fs.rmSync(path.join(target, pathname), { recursive: true }),
      );

      console.info(
        `\n✅ Extracted \x1b[35m${source}\x1b[0m into \x1b[35m${target}\x1b[0m.`,
        `\n⭐ Start development: \x1b[33mcd ${target} && npm run build && npm run dev\x1b[0m`,
      );
    } catch (e) {
      console.error(`❌ ${e}`);
      process.exit(1);
    }
  })
  .parseAsync();
