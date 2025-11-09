import asyncio
import os
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

# 環境変数の取得
API_KEY = os.getenv("API_KEY", "")
API_ENDPOINT = os.getenv("API_ENDPOINT", "")

# MCPサーバーインスタンス
app = Server("company-mcp-server")


@app.list_tools()
async def list_tools() -> list[Tool]:
    """利用可能なツールのリストを返す"""
    return [
        Tool(
            name="search_data",
            description="データベースから情報を検索します",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "検索クエリ",
                    },
                    "limit": {
                        "type": "number",
                        "description": "取得件数（デフォルト: 10）",
                        "default": 10,
                    },
                },
                "required": ["query"],
            },
        ),
        Tool(
            name="get_report",
            description="レポートを生成します",
            inputSchema={
                "type": "object",
                "properties": {
                    "report_type": {
                        "type": "string",
                        "description": "レポートの種類",
                    },
                    "date_range": {
                        "type": "string",
                        "description": "対象期間",
                    },
                },
                "required": ["report_type", "date_range"],
            },
        ),
    ]


@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """ツールを実行する"""
    if name == "search_data":
        query = arguments["query"]
        # ここで自社APIを呼び出してデータを検索
        # 例: response = await fetch_data(API_ENDPOINT, query, API_KEY)
        
        return [
            TextContent(
                type="text",
                text=f'検索結果: "{query}" にマッチするデータが見つかりました。',
            )
        ]
    
    elif name == "get_report":
        report_type = arguments["report_type"]
        date_range = arguments["date_range"]
        # ここでレポートを生成
        
        return [
            TextContent(
                type="text",
                text=f"{report_type}レポート（{date_range}）を生成しました。",
            )
        ]
    
    raise ValueError(f"未知のツール: {name}")


async def main():
    """サーバーを起動する"""
    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options(),
        )


if __name__ == "__main__":
    asyncio.run(main())
