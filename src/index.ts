#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// 環境変数の取得
const API_KEY = process.env.API_KEY || "";
const API_ENDPOINT = process.env.API_ENDPOINT || "";

// MCPサーバーの作成
const server = new Server(
  {
    name: "company-mcp-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ツールのリストを返す
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_data",
        description: "データベースから情報を検索します",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "検索クエリ",
            },
            limit: {
              type: "number",
              description: "取得件数（デフォルト: 10）",
              default: 10,
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_report",
        description: "レポートを生成します",
        inputSchema: {
          type: "object",
          properties: {
            report_type: {
              type: "string",
              description: "レポートの種類",
            },
            date_range: {
              type: "string",
              description: "対象期間",
            },
          },
          required: ["report_type", "date_range"],
        },
      },
    ],
  };
});

// ツールの実行
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "search_data") {
      // ここで自社APIを呼び出してデータを検索
      // 例: const response = await fetch(`${API_ENDPOINT}/search?q=${args.query}`);
      
      return {
        content: [
          {
            type: "text",
            text: `検索結果: "${args.query}" にマッチするデータが見つかりました。`,
          },
        ],
      };
    } else if (name === "get_report") {
      // ここでレポートを生成
      return {
        content: [
          {
            type: "text",
            text: `${args.report_type}レポート（${args.date_range}）を生成しました。`,
          },
        ],
      };
    }

    throw new Error(`未知のツール: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `エラー: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// サーバーの起動
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Company MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
