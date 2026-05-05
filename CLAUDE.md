# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 语言要求

- 全程使用中文进行对话和代码注释（变量名、函数名、专有名词、API 名称等特殊英文除外）

# 中央财经大学宣传信息图项目

## 项目概述

- **用途**：中央财经大学招生宣传信息图网页，面向高考生展示学校优势（211/双一流、北京地理位置、优势学科、高就业率等）
- **技术栈**：纯静态 HTML/CSS 信息图 + Express (Node.js) 服务器
- **页面结构**：Hero → 数据统计(4项) → 特色介绍(4项) → 学科展示(4学科) → 地理位置 → CTA → Footer
- **访问地址**：`http://localhost:3001`


## 项目结构

```
/
├── index.html                  # 单页信息图（内联CSS + 内联JS）
├── server.js                   # Express 服务器
├── package.json                # 项目配置（仅依赖 express）
├── data.json                   # 访客统计数据（运行时自动生成/更新）
└── html-infographic-generator/ # 设计模板/Skill 参考
    ├── SKILL.md                # 信息图生成器的 Skill 定义
    └── references/design-guide.md  # Magazine Layout 设计规范手册
```

## 关键架构信息

### index.html 结构

- **单文件架构**：所有 HTML、CSS、JS 内联在一个文件中，无需构建步骤
- **CSS 变量主题系统**：`:root` 中的 CSS 变量控制全局主题色，修改主题色或高亮色只需更新变量
  - `--highlight`：金色高亮 `rgba(255, 215, 0, 0.9)`
  - `--bg-primary`：主背景 `#0a0a0a`
- **动画系统**：使用 `animate` + `delay-1` ~ `delay-4` CSS 类实现淡入上移动画
- **响应式布局**：针对 900px 和 1024px 断点适配
- **内容修改**：直接编辑 HTML 中的文本块、数据卡片和统计数字即可更新页面内容

### API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/` | GET | 返回 index.html 信息图页面 |
| `/api/visits` | GET | 访客计数 +1 并返回 `{ count, lastVisit }`，数据持久化到 data.json |

### 数据层

- `data.json` 结构：`{ "count": number, "visits": [{ "time": string }] }`
- `server.js` 使用 `fs.readFileSync/writeFileSync` 同步读写，无数据库依赖

### 设计参考（用于修改视觉风格时）

- [html-infographic-generator/references/design-guide.md](html-infographic-generator/references/design-guide.md) — 完整的 Magazine Layout 设计规范，包含配色方案、字体排版、布局模板
- [html-infographic-generator/SKILL.md](html-infographic-generator/SKILL.md) — 信息图生成 Skill 定义

## 注意事项

- 不使用任何前端框架或构建工具
- 所有外部资源通过 CDN 加载（Google Fonts、Font Awesome 6）
