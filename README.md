# create-jeasx

[![npm](https://img.shields.io/npm/v/create-jeasx)](https://www.npmjs.com/package/create-jeasx)
[![license](https://img.shields.io/npm/l/create-jeasx)](LICENSE.txt)

Bootstrap a new [Jeasx](https://www.jeasx.dev) project from the command line.

`create-jeasx` downloads the [jeasx-quickstart](https://github.com/jeasx/quickstart) template, installs its dependencies and gets you ready to start developing in seconds.

## Quick start

```bash
npm create jeasx
cd jeasx-quickstart
npm run dev
```

## Usage

```bash
npm create jeasx [name] -- [options]
```

`name` is the target directory (default: `jeasx-quickstart`).

> When using `npm create`, options must follow `--` so npm passes them on to `create-jeasx`.

### Options

| Option          | Description                                               |
| --------------- | --------------------------------------------------------- |
| `--with-docker` | Keep `Dockerfile` and `.dockerignore` for Docker support. |
| `--with-vercel` | Keep `api/` and `vercel.json` for Vercel deployments.     |
| `-f, --force`   | Overwrite the target directory if it already exists.      |
| `-h, --help`    | Show help.                                                |

By default, Docker and Vercel files are removed to keep the project minimal.

### Examples

```bash
# Create a project in ./my-app
npm create jeasx my-app

# Include Docker support
npm create jeasx my-app -- --with-docker

# Include Vercel support and overwrite an existing directory
npm create jeasx my-app -- --with-vercel --force
```

You can also run it directly with `npx`:

```bash
npx create-jeasx my-app --with-docker
```

## How it works

Under the hood, `create-jeasx` uses [giget](https://github.com/unjs/giget) to fetch `github:jeasx/quickstart`, then installs dependencies and removes any optional files you didn't ask for.

## License

[MIT](LICENSE.txt)
