# Interview Coach + LingoAce 师资运营方案

Next.js 全栈面试模拟应用，含独立路由 `/teacher-ops`（师资运营 · 二面诊断 Dashboard）。

## 本地运行

```bash
npm install
cp .env.example .env   # 填写 OPENAI_API_KEY、JWT_SECRET
npm run db:push
npm run dev
```

- 模拟面试：http://localhost:3000/mock-interview
- 师资运营：http://localhost:3000/teacher-ops
- 诊断计算器：http://localhost:3000/teacher-ops/calculator

## 部署（Vercel）

本项目为 **Next.js**，请使用 [Vercel](https://vercel.com) 部署。

1. 将仓库导入 Vercel
2. 配置环境变量：`JWT_SECRET`、`OPENAI_API_KEY`、`OPENAI_MODEL`
3. 数据库：生产环境建议使用 [Vercel Postgres](https://vercel.com/storage/postgres) 或 [Turso](https://turso.tech)；`/teacher-ops` 页面不依赖数据库即可访问

## 技术栈

Next.js 15 · Prisma · SQLite · OpenAI · Tailwind CSS
