# MCP server

D2’s MCP server lets your AI client look up D2 syntax, check diagrams for
errors, and render them in chat.

In VS Code 1.101 or later, install the [D2 extension](/tour/vscode/) and open
a trusted workspace. Run **MCP: List Servers** from the Command Palette and
select **D2** to use the bundled server.

For Codex or Claude Code, [install the D2 CLI](/tour/install/) v0.10.0 or
later and run the command for your client.

| Client | Command |
| --- | --- |
| Codex | `codex mcp add d2 -- d2 mcp` |
| Claude Code | `claude mcp add --transport stdio d2 -- d2 mcp` |

> Draw a left-to-right diagram of an API sending jobs to a queue and a worker consuming them.

![API sends jobs to a queue, and the queue delivers them to a worker.](/img/generated/mcp-job-queue.png)
