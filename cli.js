#!/usr/bin/env node

import { Command } from "commander";
import { downloadTemplate } from "giget";
import fs from "node:fs";
import path from "node:path";
import { styleText } from "node:util";

await new Command()
  .name("create-jeasx")
  .description("Bootstrap a new Jeasx project from the quickstart template with a single command.")
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

      const resourcesToRemove = [];
      if (!withDocker) {
        resourcesToRemove.push("Dockerfile", ".dockerignore");
      }
      if (!withVercel) {
        resourcesToRemove.push("api", "vercel.json");
      }
      resourcesToRemove.forEach((pathname) =>
        fs.rmSync(path.join(dir, pathname), { recursive: true, force: true }),
      );

      const target = path.relative(process.cwd(), dir);
      const start = target
        ? `cd ${/\s/.test(target) ? `"${target}"` : target} && npm run dev`
        : "npm run dev";

      console.info(
        `\n✅ Extracted ${styleText("magenta", source)} into ${styleText("magenta", target || ".")}.`,
        `\n⭐ Start development: ${styleText("yellow", start)}`,
      );
    } catch (e) {
      console.error(`❌ ${e}`);
      process.exit(1);
    }
  })
  .parseAsync();
