# company-mcp-server

自社システム用のModel Context Protocol (MCP)サーバー

## 概要

このMCPサーバーは、AI（LLM）が自社システムにアクセスし、以下の機能を利用できるようにします：

- データの検索・取得
- 情報の更新
- レポートの生成
- システム連携

## 必要要件

- Node.js 18以上
- npm または yarn
- 自社システムのAPIアクセス権限

## インストール

```bash
npm install
npm run build
```

## 設定方法

### Claude Desktopでの使用

`claude_desktop_config.json`に以下を追加：

```json
{
  "mcpServers": {
    "company-server": {
      "command": "node",
      "args": ["/path/to/company-mcp-server/build/index.js"],
      "env": {
        "API_KEY": "your_api_key",
        "API_ENDPOINT": "https://your-company-api.example.com"
      }
    }
  }
}
```

### 環境変数

- `API_KEY`: 自社APIのアクセスキー
- `API_ENDPOINT`: 自社APIのエンドポイントURL

## 利用可能なツール

### search_data

**説明**: データベースから情報を検索します

**パラメータ**:
- `query` (string): 検索クエリ
- `limit` (number, optional): 取得件数（デフォルト: 10）

### get_report

**説明**: レポートを生成します

**パラメータ**:
- `report_type` (string): レポートの種類
- `date_range` (string): 対象期間

## 開発

### ローカル開発環境のセットアップ

```bash
git clone https://github.com/keythpiece/company-mcp-server.git
cd company-mcp-server
npm install
npm run dev
```

### テスト

```bash
npm test
```

### MCP Inspectorでのテスト

```bash
npm run inspector
```

ブラウザで`http://localhost:5173`を開いてテストできます。

## アーキテクチャ

このMCPサーバーは以下のSDKを使用しています：
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)

## セキュリティ

- APIキーは環境変数で管理してください
- 本番環境では適切な認証・認可を実装してください
- ログに機密情報を出力しないよう注意してください

## トラブルシューティング

### よくある問題

**接続エラーが発生する**
- 環境変数が正しく設定されているか確認してください
- APIエンドポイントにアクセスできるか確認してください

**認証エラーが発生する**
- APIキーが有効か確認してください
- APIキーの権限が適切か確認してください

## ライセンス

MIT License

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## サポート

問題や質問がある場合は、[Issueを作成](https://github.com/keythpiece/company-mcp-server/issues)してください。
