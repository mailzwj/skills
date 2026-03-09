---
name: ace-caption-creator
zh_name: ACE音乐提示词生成器
description: |
  辅助用户生成高质量的ACE-Step音乐生成caption提示词。Caption是ACE-Step系统中影响生成音乐质量的最重要的因素，包含风格、情绪、乐器、音色、节奏、氛围等多个维度。当用户需要创作音乐、生成歌曲、AI作曲、编写音乐提示词、生成ACE caption时调用此技能。触发短语包括："生成音乐"、"创作歌曲"、"AI作曲"、"写个caption"、"生成caption"、"音乐提示词"、"ACE音乐"等。
---

# ACE Caption Creator

## 概述

Caption是ACE-Step音乐生成系统中影响生成音乐质量的**最重要的因素**。一个精心设计的caption能够准确传达您的音乐创意，帮助AI生成符合预期的音乐作品。

本技能通过交互式对话，引导用户逐步构建包含多个维度的高质量caption，并提供专业的建议和丰富的选项。

## Caption的核心维度

一个完整的caption通常包含以下维度（按重要性排序）：

1. **音乐风格** - 定义音乐的基本类型和流派
2. **情绪氛围** - 传达音乐的情感基调
3. **主要乐器** - 确定音乐的核心音色
4. **节奏速度** - 设定音乐的律动感
5. **音色特点** - 描述声音的质感
6. **主题场景** - 提供创作背景或故事性

## 交互流程

当用户请求生成caption时，按照以下步骤进行交互：

### 第1步：确定音乐风格

使用 AskUserQuestion 工具询问用户：

```
question: "您想要创作什么风格的音乐？"
options:
  - label: "流行 (Pop)"
    description: "旋律优美，节奏明快，易于传唱"
  - label: "摇滚 (Rock)"
    description: "充满力量，节奏强烈，适合表达激情"
  - label: "古典 (Classical)"
    description: "优雅庄重，结构严谨，适合正式场合"
  - label: "电子 (Electronic)"
    description: "现代感强，音色丰富，适合科技场景"
  - label: "爵士 (Jazz)"
    description: "即兴自由，和声复杂，适合休闲氛围"
  - label: "民谣 (Folk)"
    description: "质朴自然，倾诉感强，适合叙事"
  - label: "R&B/灵魂"
    description: "节奏感强，情感丰富，富有律动"
  - label: "自定义风格"
    description: "输入您想要的其他风格"
```

### 第2步：选择情绪氛围

根据风格继续询问：

```
question: "您希望音乐传达什么情绪和氛围？"
options:
  - label: "欢快活力"
    description: "积极向上，充满正能量"
  - label: "忧郁感伤"
    description: "深沉内敛，引人共鸣"
  - label: "激昂澎湃"
    description: "气势磅礴，振奋人心"
  - label: "宁静祥和"
    description: "平静放松，治愈心灵"
  - label: "浪漫温馨"
    description: "柔情蜜意，适合爱情主题"
  - label: "神秘诡谲"
    description: "充满未知，引人遐想"
  - label: "紧张悬疑"
    description: "压迫感强，适合戏剧场景"
  - label: "自定义情绪"
    description: "描述您想要的其他情绪"
```

### 第3步：选择主要乐器

```
question: "请选择要突出的主要乐器（选择最重要的1-3种）"
multiSelect: true
options:
  - label: "钢琴"
    description: "经典优雅，适合抒情"
  - label: "木吉他/电吉他"
    description: "温暖亲切或激情澎湃"
  - label: "弦乐（小提琴/大提琴）"
    description: "情感细腻，层次丰富"
  - label: "鼓/打击乐"
    description: "节奏感强，力量感足"
  - label: "电子合成器"
    description: "现代电子音色，氛围感强"
  - label: "贝斯"
    description: "低音基础，律动感"
  - label: "管乐（萨克斯/小号）"
    description: "爵士风情，充满活力"
  - label: "民族乐器"
    description: "古筝、笛子、二胡等东方音韵"
```

### 第4步：设定节奏速度

```
question: "音乐的节奏速度如何？"
options:
  - label: "慢速 (60-80 BPM)"
    description: "舒缓放松，适合抒情、冥想"
  - label: "中速 (90-120 BPM)"
    description: "自然流畅，适合大多数场景"
  - label: "快速 (130-160 BPM)"
    description: "充满活力，适合舞蹈、运动"
  - label: "变速"
    description: "快慢交替，增加戏剧性"
```

### 第5步：描述音色特点

```
question: "您希望音乐呈现什么样的音色特点？"
options:
  - label: "清澈明亮"
    description: "音色通透，高频突出"
  - label: "温暖柔和"
    description: "音色圆润，中频饱满"
  - label: "厚重深沉"
    description: "音色厚实，低频丰富"
  - label: "空灵缥缈"
    description: "带有混响回声，空间感强"
  - label: "干净简洁"
    description: "编曲简单，乐器分离清晰"
  - label: "丰富层次"
    description: "编曲复杂，多重音轨叠加"
```

### 第6步：添加主题描述

询问用户：
"请简单描述您的音乐主题或使用场景，例如：
- 一首关于失恋的歌曲
- 适合雨天聆听的背景音乐
- 电影配乐风格的史诗场景
- 瑜伽冥想用的放松音乐
- 可以留空，由系统自动补充"

## 生成Caption

收集完所有信息后，按照以下格式生成最终的caption：

### Caption生成规则

1. **基本结构**：`[风格] + [情绪] + [乐器] + [节奏/速度] + [音色] + [主题]`

2. **格式要求**：
   - 使用英文为主，便于系统理解
   - 多个元素用逗号分隔
   - 添加适当的修饰词增强表达
   - 控制总长度在50-150词之间

3. **示例**：

**轻快流行**：
```
A bright and upbeat pop song with cheerful energy, featuring acoustic guitar
and piano melodies, light drums, moderate tempo around 100 BPM, clear and
clean production, perfect for a sunny day or road trip, catchy and memorable.
```

**深情抒情**：
```
A melancholic and emotional ballad in pop style, slow tempo at 70 BPM with
heartfelt piano and gentle strings, warm and intimate vocal tone, evoking
feelings of nostalgia and lost love, suitable for late night reflection.
```

**电子舞曲**：
```
High-energy electronic dance music with driving synth bass and pulsating
beats at 138 BPM, futuristic and atmospheric sound design, euphoric drops
and_build-ups, perfect for nightclub or festival setting, hypnotic and
energetic throughout.
```

**古风民谣**：
```
A gentle Chinese folk ballad featuring guzheng and bamboo flute, slow and
contemplative tempo, ethereal and pastoral atmosphere, poetic lyrics about
longing and nature, traditional pentatonic melodies with modern production.
```

### 中文Caption示例

如果需要中文caption：

```
一首轻快活泼的流行歌曲，充满阳光能量，以原声吉他和钢琴为主旋律，
配以轻快的鼓点，速度约100BPM，音色清澈干净，适合晴朗的日子或自驾
旅行，旋律朗朗上口。
```

## 高级技巧

参考 `references/caption_techniques.md` 了解：

- 如何组合风格创造独特效果
- 避免常见冲突的方法
- 使用参考作品锚定创意
- 质感词的运用技巧
- 变量和随机性的使用

## 最终确认

生成caption后，使用 AskUserQuestion 询问用户：

```
question: "这是为您生成的caption，您满意吗？"
options:
  - label: "满意，直接使用"
    description: "将使用这个caption"
  - label: "需要调整"
    description: "告诉我需要修改的地方"
  - label: "提供英文版本"
    description: "生成英文版本便于AI理解"
  - label: "重新生成"
    description: "重新开始整个流程"
```

## 输出格式

最终输出的caption应包含：

```markdown
## 您的音乐Caption

**风格**: [从用户选择生成]
**情绪**: [从用户选择生成]
**主要乐器**: [从用户选择生成]
**节奏速度**: [从用户选择生成]
**音色特点**: [从用户选择生成]
**主题描述**: [用户输入的主题]

### 生成的Caption

[完整的caption文本]

### 英文版本（推荐）

[英文版caption，如果原始生成的是中文]

### 使用建议

[根据选择提供1-2条专业建议]
```
