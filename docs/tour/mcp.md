# MCP server

[Install D2](/tour/install/) v0.10.0 or later to let your AI client look up D2
syntax, check diagrams for errors, and render them in chat.

Run the command for your client.

| Client | Command |
| --- | --- |
| Codex | `codex mcp add d2 -- d2 mcp` |
| Claude Code | `claude mcp add --transport stdio d2 -- d2 mcp` |

> Draw a left-to-right diagram of an API sending jobs to a queue and a worker consuming them.

![API sends jobs to a queue, and the queue delivers them to a worker.](/img/generated/mcp-job-queue.png)
