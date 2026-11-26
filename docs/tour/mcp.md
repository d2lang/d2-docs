---
title: D2 MCP server
description: Connect an AI client to D2 to check diagram source and render the result in your conversation.
---

# D2 MCP server

`d2 mcp` lets an AI client read the D2 language guide, check a diagram for errors,
and render it in your conversation. The client starts the local D2 executable and
uses the Model Context Protocol (MCP) over standard input and output.

## Connect your client

The MCP server is built into D2 v0.10.0 and later. [Install D2](/tour/install/)
and run `d2 mcp --help` to verify that the command is available. If your client
finds an older D2 on its `PATH`, configure it with the absolute path to the D2
executable you just installed.

For Codex or Claude Code, register D2 from your terminal.

| Client | Command |
| --- | --- |
| [Codex](https://developers.openai.com/codex/mcp/) | `codex mcp add d2 -- d2 mcp` |
| [Claude Code](https://code.claude.com/docs/en/mcp) | `claude mcp add --transport stdio d2 -- d2 mcp` |

For GitHub Copilot in VS Code, add this server to `.mcp.json` at the root of
your workspace. [VS Code MCP configuration](https://code.visualstudio.com/docs/agents/reference/mcp-configuration)

```json
{
  "mcpServers": {
    "d2": {
      "type": "stdio",
      "command": "d2",
      "args": ["mcp"]
    }
  }
}
```

## Try a diagram

> Draw a left-to-right diagram of an API putting jobs on a queue and a worker
> consuming them. Use D2 to check the source and show me the rendered diagram.

The client can call `guide` for syntax, then pass its D2 source to `check`.
For example, if the first line says `direction: LR`, `check` points to line 1,
column 12 and lists the accepted directions. The client can change it to
`direction: right` and pass this source to `render`.

```d2
direction: right
api: API
jobs: Job queue {shape: queue}
worker: Worker

api -> jobs: enqueue
jobs -> worker: deliver
```

![The API enqueues jobs on the job queue, which delivers them to the worker.](/img/generated/mcp-job-queue.png)

| Tool | What you can ask for |
| --- | --- |
| `guide` | D2 syntax and examples for the installed version. Set `topic` to `reference` to list shapes, style keywords, themes, and layout engines. |
| `check` | Compiler diagnostics with file, line, and column. Set `fmt` to `true` to get the formatted source when it parses. |
| `render` | A PNG by default. Set `format` to `svg` for SVG source or `txt` for a text drawing. Use `target` to select a board, such as `layers.api`. |

Clients that support MCP Apps can display a zoomable diagram viewer. Use
`--no-ui` to disable the viewer and keep receiving the render result.

## Read diagrams from a project

By default, `check` and `render` read the `source` text supplied by the client.
To read diagram files, imports, or local images, give the server a project
directory with `--root`. For a project in `/projects/shop`, the server arguments
would look like this.

```json
["mcp", "--root", "/projects/shop"]
```

With that root, ask the client to render `diagrams/jobs.d2`. It passes
`{"path": "diagrams/jobs.d2"}` to `render`. Pass exactly one of `source` and
`path`. Diagram paths must end in `.d2`. If you use a symlink, point it at a
relative target that resolves to a `.d2` file inside the root. The same directory
boundary applies to local images and
[imports](/tour/imports/).

A tool call has a default timeout of 60 seconds. Use `--timeout` to set it to
between 1 and 600 seconds. You can also configure the three server flags with
`D2_MCP_ROOT`, `D2_MCP_NO_UI`, and `D2_MCP_TIMEOUT`.
