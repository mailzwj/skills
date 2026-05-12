# MD2WeChat 主题测试

测试文章副标题。

## 代码块高亮测试

### JavaScript

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(`Result: ${result}`);
```

### Python

```python
import json
from typing import List, Optional

class Article:
    """微信公众号文章"""
    def __init__(self, title: str, content: str):
        self.title = title
        self.content = content

    def to_json(self) -> str:
        return json.dumps({
            "title": self.title,
            "content": self.content
        }, ensure_ascii=False)
```

### Bash

```bash
# 安装依赖
npm install

# 转换 Markdown
npx tsx index.ts article.md output.html --theme chinese-red
```

## 引用块测试

> 开源、本地优先的 Claude Design 替代方案 —— 用你本地的 AI 编码 Agent，在浏览器中完成原型设计、品牌规范和多媒体内容创作。

## 表格测试

| 特性 | 说明 | 状态 |
|------|------|------|
| Markdown 解析 | 基于 marked，支持 GFM | ✅ |
| 语法高亮 | 基于 highlight.js | ✅ |
| 内联样式 | 兼容微信公众号 | ✅ |

## 列表测试

- 普通文本列表项
- **粗体文本**后面是普通文本
- 包含 `行内代码` 的列表项

1. 有序列表第一项
2. 有序列表第二项
3. 有序列表第三项
