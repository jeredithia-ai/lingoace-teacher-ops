# Interview Coach + LingoAce 师资运营方案

Next.js 全栈面试模拟应用，含独立路由 `/lingoace`（二面诊断 Dashboard）。

## 本地运行

```bash
npm install
cp .env.example .env   # 填写 OPENAI_API_KEY、JWT_SECRET
npm run db:push
npm run dev
```

- 主页：http://localhost:3000
- LingoAce 方案：http://localhost:3000/lingoace
- 诊断计算器：http://localhost:3000/lingoace/calculator

## 部署（Vercel）

本项目为 **Next.js**，请使用 [Vercel](https://vercel.com) 部署（非 Streamlit）。

1. 将仓库导入 Vercel
2. 配置环境变量：`JWT_SECRET`、`OPENAI_API_KEY`、`OPENAI_MODEL`
3. 数据库：生产环境建议使用 [Vercel Postgres](https://vercel.com/storage/postgres) 或 [Turso](https://turso.tech)；`/lingoace` 页面不依赖数据库即可访问

## 技术栈

Next.js 15 · Prisma · SQLite · OpenAI · Tailwind CSS
