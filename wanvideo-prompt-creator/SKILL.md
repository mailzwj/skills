---
name: wanvideo-prompt-creator
zh_name: 万相视频提示词生成器
description: |
  万相视频提示词生成技能。当用户需要生成万相(WanVideo)AI视频提示词、创作视频脚本、AI视频生成时调用。支持交互式对话流程，辅助用户创建专业、符合万相提示词推荐格式的高质量视频生成提示词。

  触发短语包括："生成视频提示词"、"万相提示词"、"AI视频"、"视频生成"、"生成万相"、"帮我写个视频prompt"、"视频脚本"等。即使用户只是描述想要生成什么样的视频，也应主动使用此技能提供专业指导。
---

# 万相视频提示词生成器

## 概述

万相(WanVideo)视频生成的质量高度依赖提示词的专业性和完整性。本技能通过使用 AskUserQuestion 交互组件，以结构化的方式引导用户，确保提示词涵盖所有核心要素，从而生成令人满意的视频内容。

## 交互流程

当用户请求生成视频提示词时，按照以下步骤依次使用 AskUserQuestion 工具进行交互：

---

### 第1步：了解核心创意

首先，如果用户还未描述核心创意，使用 AskUserQuestion 询问：

```
question: "请告诉我您想生成什么样的视频？"
header: "核心创意"
options:
  - label: "人物视频"
    description: "以人物为主角的视频，如人物特写、动作展示等"
    markdown: |
      示例：一个人在海边漫步、女孩微笑转身、舞者表演等
  - label: "风景视频"
    description: "自然或城市风景，如山川湖海、都市夜景等"
    markdown: |
      示例：日出日落、瀑布流水、城市天际线等
  - label: "动物视频"
    description: "以动物为主体的视频，如宠物、野生动物等"
    markdown: |
      示例：猫咪玩耍、鸟类飞翔、狮子奔跑等
  - label: "产品展示"
    description: "商品或物体的展示视频"
    markdown: |
      示例：化妆品展示、汽车外观、珠宝特写等
  - label: "创意短片"
    description: "有故事性或创意性的视频内容"
    markdown: |
      示例：微电影片段、创意广告、艺术短片等
```

根据用户选择的方向，继续下一步。

---

### 第2步：确定视频风格

使用 AskUserQuestion 询问用户偏好的风格：

```
question: "您希望视频呈现什么风格？"
header: "视频风格"
options:
  - label: "电影级录制"
    description: "真实感强、画质高、适合叙事类视频"
  - label: "电影级动画"
    description: "动画风格、适合创意和幻想类内容"
  - label: "胶片风格"
    description: "复古怀旧、文艺质感"
  - label: "纪录片风格"
    description: "真实记录、自然朴实"
  - label: "写实摄影"
    description: "高清摄影质感"
```

---

### 第3步：描述画面主体

根据第1步选择的类型，使用 AskUserQuestion 引导用户描述主体：

#### 如果是【人物视频】：

```
question: "请描述画面中人物的特征"
header: "人物特征"
options:
  - label: "年轻女性"
    description: "年轻女性形象，可选择具体特征"
  - label: "年轻男性"
    description: "年轻男性形象，可选择具体特征"
  - label: "中年人物"
    description: "成熟稳重的中年人物"
  - label: "儿童"
    description: "天真可爱的儿童形象"
  - label: "老年人物"
    description: "慈祥或睿智的老年形象"
  - label: "自定义描述"
    description: "详细描述您想要的人物特征"
```

紧接着询问：

```
question: "人物的穿着打扮是怎样的？"
header: "人物穿着"
options:
  - label: "休闲装"
    description: "T恤、牛仔裤等日常休闲穿着"
  - label: "正装/西装"
    description: "正式场合的正装"
  - label: "连衣裙"
    description: "优雅的连衣裙"
  - label: "运动装"
    description: "运动风格的服装"
  - label: "古装/传统服饰"
    description: "汉服、和服等传统服饰"
  - label: "自定义穿着"
    description: "描述您想要的穿着风格"
```

#### 如果是【风景视频】：

```
question: "请选择风景类型"
header: "风景类型"
options:
  - label: "海洋/沙滩"
    description: "大海、沙滩、海浪等海洋场景"
  - label: "山脉/森林"
    description: "高山、森林、峡谷等自然景观"
  - label: "城市景观"
    description: "城市天际线、街道、建筑等"
  - label: "田园风光"
    description: "田野、农场、乡村景色"
  - label: "天空/云彩"
    description: "日出日落、星空、云海等"
  - label: "自定义场景"
    description: "描述您想要的风景场景"
```

#### 如果是【动物视频】：

```
question: "请选择动物类型"
header: "动物类型"
options:
  - label: "猫科动物"
    description: "猫咪、狮子、老虎等"
  - label: "犬科动物"
    description: "狗、狼、狐狸等"
  - label: "鸟类"
    description: "各种鸟类的飞翔或栖息场景"
  - label: "海洋生物"
    description: "鱼类、海豚、鲸鱼等"
  - label: "昆虫"
    description: "蝴蝶、蜜蜂等昆虫特写"
  - label: "自定义动物"
    description: "描述您想要的动物类型"
```

---

### 第4步：确定动作描述

使用 AskUserQuestion 询问主体的动作：

```
question: "主体在画面中做什么动作？"
header: "动作描述"
options:
  - label: "静止/站姿"
    description: "保持静止状态或站立姿势"
  - label: "缓慢行走"
    description: "悠闲地行走或漫步"
  - label: "奔跑/快速移动"
    description: "快速奔跑或急促移动"
  - label: "转身/回头"
    description: "转身面向镜头或回头动作"
  - label: "手部动作"
    description: "挥手、触摸、抓取等手部动作"
  - label: "表情变化"
    description: "微笑、思考、惊讶等表情变化"
multiSelect: true
```

---

### 第5步：确定环境背景

使用 AskUserQuestion 询问环境设定：

```
question: "视频发生在什么环境中？"
header: "环境背景"
options:
  - label: "室内环境"
    description: "房间、办公室、咖啡厅等室内场景"
  - label: "户外自然"
    description: "森林、草原、海滩等自然户外场景"
  - label: "城市街道"
    description: "街道、广场、城市建筑等"
  - label: "特殊场景"
    description: "雪山、沙漠、极光等特殊场景"
  - label: "抽象背景"
    description: "纯色背景、光影效果等抽象场景"
  - label: "自定义环境"
    description: "描述您想要的环境场景"
```

接着询问时间氛围：

```
question: "希望是什么时间和氛围？"
header: "时间氛围"
options:
  - label: "清晨"
    description: "清新的早晨光线，柔和明亮"
  - label: "正午"
    description: "强烈的日光，光线充足"
  - label: "黄昏/日落"
    description: "温暖的金色光线，浪漫氛围"
  - label: "夜晚"
    description: "夜景灯光，星空或城市灯火"
  - label: "阴天/雨景"
    description: "阴郁或诗意的阴雨天气"
  - label: "自定义氛围"
    description: "描述您想要的时间或氛围"
```

---

### 第6步：选择镜头语言

使用 AskUserQuestion 询问镜头运动：

```
question: "您希望镜头怎样运动？"
header: "镜头语言"
options:
  - label: "推镜头"
    description: "焦点拉近、突出主体、增强情感张力"
  - label: "拉镜头"
    description: "焦点拉远、展示环境、交代空间关系"
  - label: "摇镜头"
    description: "左右转动、展示全景或跟拍"
  - label: "移镜头"
    description: "平行移动、产生运动感"
  - label: "跟镜头"
    description: "跟随主体移动、增强代入感"
  - label: "升降镜头"
    description: "垂直运动、展示空间层次"
  - label: "静止镜头"
    description: "镜头保持静止，画面稳定"
```

---

### 第7步：确定技术参数

使用 AskUserQuestion 询问技术参数：

```
question: "视频需要什么比例？"
header: "视频比例"
options:
  - label: "16:9 横屏"
    description: "适合电脑、电视观看的标准横屏比例"
  - label: "9:16 竖屏"
    description: "适合手机、短视频平台的竖屏比例"
  - label: "1:1 方形"
    description: "适合社交媒体展示的方形视频"
```

```
question: "视频时长需要多长？"
header: "视频时长"
options:
  - label: "5秒"
    description: "短小精悍，适合快速展示"
  - label: "10秒"
    description: "标准时长，内容更丰富"
```

```
question: "选择生成模式"
header: "生成模式"
options:
  - label: "标准模式"
    description: "稳定输出，适合大多数场景"
  - label: "创意模式"
    description: "更大胆的创意表达，可能有意想不到的效果"
  - label: "P35镜头"
    description: "模拟电影胶片镜头质感"
  - label: "大师镜头"
    description: "专业级电影镜头效果"
```

```
question: "选择帧率"
header: "帧率设置"
options:
  - label: "24帧"
    description: "电影感，适合叙事类视频"
  - label: "25帧"
    description: "标准帧率，平衡流畅度和质量"
  - label: "30帧"
    description: "高流畅度，动作更顺滑"
```

---

### 第8步：最终确认

收集完所有信息后，生成提示词预览，并使用 AskUserQuestion 进行最终确认：

```
question: "这是为您生成的提示词预览，您满意吗？"
header: "确认提示词"
options:
  - label: "满意，直接使用"
    description: "将使用这个提示词"
  - label: "需要调整"
    description: "我想修改某些细节"
  - label: "提供英文版本"
    description: "同时生成英文版提示词"
  - label: "重新生成"
    description: "重新开始整个流程"
```

---

## 提示词生成规则

收集完所有信息后，按照以下格式生成最终提示词：

### 基本结构

```
[主体描述] + [动作描述] + [环境背景] + [风格模式] + [镜头语言]
```

### 中文提示词模板

#### 人物视频
```
[人物外貌特征]，[穿着打扮]，[表情神态]，[动作行为]，[环境场景]，[光影氛围]，[风格模式]，[镜头运动]
```

#### 风景视频
```
[场景描述]，[时间天气]，[自然元素动态]，[氛围感受]，[风格模式]，[镜头运动]
```

#### 动物视频
```
[动物特征]，[动作行为]，[环境背景]，[互动元素]，[风格模式]，[镜头运动]
```

#### 产品展示
```
[产品特征]，[展示角度]，[背景环境]，[光影效果]，[风格模式]，[镜头运动]
```

---

## 输出格式

最终输出的提示词应按以下格式呈现：

```markdown
## 万相视频提示词

### 中文提示词
[完整的中文提示词，约100-300字]

### 英文提示词（备选）
[对应的英文提示词]

### 技术参数
| 参数 | 设置 |
|-----|-----|
| 视频比例 | [用户选择] |
| 生成模式 | [用户选择] |
| 时长 | [用户选择] |
| 帧率 | [用户选择] |
| 分辨率 | 1080p |

### 创作建议
[根据用户选择，提供1-2条专业建议]
```

---

## 注意事项

1. **逐步交互**：每次只询问一个问题，不要一次性展示所有选项
2. **记住选择**：在后续交互中引用用户之前的选择
3. **智能跳过**：如果用户初始描述中已包含某些信息，不要重复询问
4. **提供选项**：始终提供预设选项，同时保留"自定义"入口
5. **使用多选**：对于可以多选的问题（如动作），设置 `multiSelect: true`
6. **预览确认**：生成前必须让用户确认，避免不符合预期的输出
7. **提供预览**：在选项中使用 `markdown` 字段提供示例预览

---

## 示例交互流程

**用户触发**: "帮我生成一个海边的视频提示词"

**第1步** - 核心创意: 用户选择"风景视频"或描述"海边风景"

**第2步** - 视频风格: 使用 AskUserQuestion 提供风格选项

**第3步** - 风景类型: 用户选择"海洋/沙滩"

**第4步** - 动作描述: 询问海浪动态或其他元素运动

**第5步** - 环境背景: 确认具体场景（已在初始描述中，可智能跳过或细化）

**第6步** - 镜头语言: 使用 AskUserQuestion 提供镜头选项

**第7步** - 技术参数: 依次询问比例、时长、模式、帧率

**第8步** - 最终确认: 展示预览并确认

---

## 高级技巧

当用户已有明确描述时，使用 AskUserQuestion 确认并补充：

```
question: "您提到想要[用户描述的核心内容]，请问需要补充以下哪些细节？"
header: "补充细节"
options:
  - label: "添加时间氛围"
    description: "如清晨、日落、夜晚等"
  - label: "调整镜头运动"
    description: "如推镜头、跟镜头等"
  - label: "优化风格描述"
    description: "如电影级、胶片风格等"
  - label: "信息已完整"
    description: "直接生成提示词"
multiSelect: true
```

这样可以智能地跳过用户已明确告知的信息，提高交互效率。
