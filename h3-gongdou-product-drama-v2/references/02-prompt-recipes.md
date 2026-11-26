# 分镜与 MiniMax H3 提示词规范

## 目录
- [1. 模式选择](#1-模式选择)
- [2. 英文锚点句](#2-英文锚点句)
- [3. Ref2VA 六段式](#3-ref2va-六段式)
- [4. T2VA 三字段](#4-t2va-三字段)
- [5. 参考标签规则](#5-参考标签规则)
- [6. 景别与运镜](#6-景别与运镜)
- [7. 台词、说话人与旁白](#7-台词说话人与旁白)
- [8. 声音两个字段](#8-声音两个字段)
- [9. 负向词转正向锁定](#9-负向词转正向锁定)
- [10. 时长与切分](#10-时长与切分)
- [11. 平台转换](#11-平台转换)
- [12. 完整示例](#12-完整示例)
- [13. 角色卡图像提示词](#13-角色卡图像提示词)
- [14. 场景卡图像提示词](#14-场景卡图像提示词)
- [15. 全局素材参考顺序表](#15-全局素材参考顺序表)

---

## 1. 模式选择

一条提示词对应一次生成、一个分镜。先看这一镜有没有参考图：

| 条件 | 模式 | 结构 |
| --- | --- | --- |
| 该镜挂了商品图、角色卡、场景卡任一 | **Ref2VA 全参考** | `subject_definitions` / `summary` / `retention_analysis` / `detailed_description` / `overall_soundscape` / `non_diegetic_music` |
| 一张参考图都没有（且用户拒绝建卡） | **T2VA 文本** | `integrated_multimodal_description` / `overall_soundscape` / `non_diegetic_music` |

- 建了卡就默认 Ref2VA，不因为"角色只用文字也能描述"而降级成 T2VA。
- 同一镜不要混用两种结构，六段缺一段就不合格。
- 商品图、角色卡、场景卡都只作**参考**，不当首帧。当首帧会锁死构图，本 Skill 的镜头调度就没了。
- 除台词和画面内文字外，正文一律英文；台词保留中文原文。
- 任务类型前缀默认 `[reference generation]`；只有把参考图当成了具体帧锚点才写 `[keyframe completion + reference generation]`。

---

## 2. 英文锚点句

第二步产出的英文锚点块是唯一事实源，同时逐字写进角色卡/场景卡提示词与第七步的镜头提示词，不许现翻、不许换同义词。

### 角色句

结构：`age + face shape + hairstyle and hair ornament + robe color and fabric + signature detail + expression baseline`

> The chief consort is a woman in her early forties with a broad square face, a low bun pinned with a kingfisher-feather ornament, a vermilion gold-woven court robe, and an old jade ring on her left ring finger; her gaze is heavy and she does not smile.

要求：

- 每个角色 3–4 个可复述细节，至少 1 个异常点（疤、单只耳坠、旧戒痕、袖口补丁）。
- 脸型、发型、服色写具体英文词，不用 "elegant""noble" 这类评价词。
- 同框超过 2 人时，另加一句空间关系：`The chief consort sits behind the table at frame right; the new consort stands three steps in front, at frame left; the maid waits by the door.`
- 这句话就是角色卡的"身份锁"，卡图与镜头提示词都用同一句，不另写一套。

### 商品句

结构：`category + shape + color name + material finish + key structure + label position + size reference`

> The product is a matte dark-green cylindrical 500 ml vacuum flask with a narrowed shoulder, a brushed dark-gold screw cap, a plain unpatterned body, and a small blank white label near the lower front.

要求：

- 颜色写具体名（matte dark green / amber tea / indigo / lotus pink），不写 "premium color"。
- 关键结构写 1–2 个不能省略的物理细节（cap position、seam direction、handle curve、inner plug）。
- 标签上有小字时，写成 `a small blank white label`，品牌名走后期字卡；否则 H3 容易生成伪文字。

### 场景、光影、声音基调

每个场景各写一句（全片 1–3 个场景），该场景的所有镜头逐字复用；结构：`Scene <name>: space and structure; fixed landmarks: <landmark + screen position>; light baseline: <main + fill + rim>; props: <whitelist>`。

> Scene Hall-01: a new-Chinese palace inner hall with dark wooden lattice screens on frame right and a plain folding screen at frame left; fixed landmarks: lattice door at right third, bronze censer at bottom center, dark table at center; light baseline: soft side-backlight from frame right with warm candle fill from below; props: wooden table, bronze censer, porcelain cups, silk cushions.

光影与声音基调各写一句，全场复用：

> Light: soft side-backlight from frame right with warm candle fill from below; faces clearly lit; cinematic; 9:16 vertical; vermilion, dark teal, and dark gold palette with the product color as the only saturated accent.
>
> Sound base: low indoor room tone, faint candle crackle, and soft silk rustle throughout; sparse guzheng and a sustained low drone at a slow tempo.

场景句与光位句就是场景卡的"环境锁"，场景卡提示词与镜头提示词用同一套，不另写布局。

---

## 3. Ref2VA 六段式

字段顺序固定，不能改名、不能增删。

### 3.1 subject_definitions

每个被参考的实体一行，写清标签、来源、外观特征：

```
<Subject 1> is the vacuum flask in <Picture 1>, a matte dark-green cylindrical 500 ml body with a narrowed shoulder, a brushed dark-gold screw cap, a plain unpatterned surface, and a small blank white label near the lower front.
<Subject 2> is the chief consort in <Picture 2>, a woman in her early forties with a broad square face, a low bun pinned with a kingfisher-feather ornament, a vermilion gold-woven court robe, and an old jade ring on her left ring finger; her gaze is heavy and she does not smile.
<Subject 3> is the new consort in <Picture 3>, a woman in her early twenties with an oval face, a high coiled bun with a single plain silver hairpin, a dark-teal satin high-collar dress, and a faint scar at the tail of her right eyebrow; her eyes stay lowered.
<Subject 6> is the inner hall in <Picture 4>, a new-Chinese palace inner hall with dark wooden lattice screens on frame right and a plain folding screen at frame left; fixed landmarks are the lattice door at right third, the bronze censer at bottom center, and the dark table at center.
```

- Subject 编号来自第四步全局素材参考顺序表，按实际素材连续编号、全片稳定（上例场景为顺序表第 6 项）；`<Picture N>` 是本条任务的附件本地编号，从 1 起。
- `<Subject N>` 是"可复用的可见内容单元"，人、物、场景、服装、风格都可以。
- 只给有卡/图的实体建 Subject。群演和纯文字角色不建 Subject，直接在 `detailed_description` 里写锚点句并分配 `(Sx)`。
- 一个图只用来定义角色/商品/场景时，把图在 Subject 行里引用，不另开 `<Picture N>` 行。
- `<Picture N>` 单独成行只用于"这张图就是某一帧/构图锚点"的情况。
- 卡图未生成（`pending`）也照写 Subject 行，图片后补即可；不因缺图删掉 Subject 或改走 T2VA。

### 3.2 summary

一段短英文，开头方括号任务类型，只用已定义的标签，不引入新标签：

```
[reference generation] A single-shot palace-drama beat in which the new consort presents <Subject 1> to the seated chief consort, preserving <Subject 1>, <Subject 2>, <Subject 3>, and <Subject 6> from their reference images.
```

### 3.3 retention_analysis

每个参考实体一行，用固定关系标记：

| 标记 | 含义 |
| --- | --- |
| `fully_preserved` | 参考内容的既定角色被完整保留 |
| `partially_preserved` | 仍在使用，但部分特征被改动或只保留一部分 |
| `attribute_transfer` | 特征迁移到另一个可识别主体 |
| `weak_reference` | 只保留风格、类别、构图或氛围上的大致相似 |

挂了商品主图的镜头必须写 `fully_preserved`，并把不可变项列全；角色卡与场景卡同理：

```
<Subject 1> (appears in [Shot 1]): fully_preserved - the matte dark-green color, cylindrical shape, narrowed shoulder, dark-gold cap, blank white label position, and part count stay identical to <Picture 1> throughout the shot.
<Subject 2> (appears in [Shot 1]): fully_preserved - the square face, low bun with the kingfisher-feather ornament, vermilion gold-woven robe, and old jade ring stay identical to <Picture 2>.
<Subject 3> (appears in [Shot 1]): fully_preserved - the oval face, high coiled bun with the plain silver hairpin, dark-teal satin dress, and the scar at the tail of the right eyebrow stay identical to <Picture 3>.
<Subject 6> (appears in [Shot 1]): fully_preserved - the layout, the landmark positions, the materials, and the light baseline stay identical to <Picture 4>.
```

只有分镜明确换时间/天气/光态时，场景才写 `partially_preserved` 并说明变化（如"candlelight dims to a single wick after the reversal"）。新增剧情动作不算参考保真度损失。

### 3.4 detailed_description

正文主体，按时间轴写。Ref2VA 的风格句放在 `[Shot 1]` **之前**，逐字复制风格锁英文串，不逐镜另写调色：

```
cinematic new-Chinese palace period drama, realistic photographic look, soft side-backlight with warm candle fill, desaturated vermilion, dark-teal, and dark-gold palette, authentic silk and ceramic material response, the product color as the only saturated accent, shallow filmic depth of field, 9:16 vertical framing.
[Shot 1] A medium shot frames ...
```

每一镜必须落到七件事：

1. 构图与景别
2. 主体外观与站位（有卡用 `<Subject N>` 指代，无卡群演写锚点句）
3. 环境、道具与光线
4. 这一镜唯一的主动作与状态变化
5. 运镜（类型 + 幅度 + 速度）
6. 同期声与台词
7. 参考内容在哪一刻生效（如 `matching <Picture 1>`、`the cap shown in <Picture 1>`）

详细度目标 350–500 英文词；2–3 秒短切镜可压到约 200 词，但上面七件事一件不能少。不要把正文写成剧情梗概或参考关系清单。

### 3.5 overall_soundscape

1–4 句英文，只写环境声、动作声、非语言人声。不写台词、不写配乐。

```
overall_soundscape: Low indoor room tone with a faint candle flicker. Soft fabric rustle and light footsteps cross the carpet, followed by the quiet creak of a wooden chair.
```

### 3.6 non_diegetic_music

1–3 句英文，写器乐、速度、节奏、动态变化；不用抽象情绪词，不解释配乐功能。没有就写 `N/A`。

```
non_diegetic_music: A single guzheng pluck at a slow tempo over a sustained low drone, with one soft struck-wood pulse as the camera settles.
```

---

## 4. T2VA 三字段

没有参考图的镜头（空镜、纯人物反应、开场压制）用三字段。风格句放在 `[Shot 1]` **之后**，且不使用任何参考标签。

```
integrated_multimodal_description: [Shot 1] Live-action, cinematic, a medium close-up at a slight high angle frames ...

overall_soundscape: ...

non_diegetic_music: ...
```

其余写法与 Ref2VA 的 `detailed_description` 相同：一镜一个主动作、运镜写全类型/幅度/速度、台词进 `<d>`。

---

## 5. 参考标签规则

| 标签 | 用途 |
| --- | --- |
| `<Subject N>` | 从参考素材中抽象出的可见内容（人、物、场景），编号来自全局素材参考顺序表 |
| `<Picture N>` | 单条任务的附件本地编号，按本条挂载顺序从 1 起 |
| `<Video N>` | 参考视频（本 Skill 默认不用） |
| `<Audio N>` | 复用的音频（本 Skill 默认不用） |

- 标签在一条提示词内定义一次，之后含义不变；不能出现未定义标签。
- `<Subject N>` 全片稳定：按实际素材连续编号（商品主图 → 商品细节（有才编）→ 角色卡 → 场景卡），跨镜复用同一编号；每条提示词仍要重新写本条的 `subject_definitions`，但不改编号、不引用上一条的定义。
- 挂载顺序固定：商品主图（必填）→ 商品细节（有则挂）→ 在屏角色卡 → 本镜场景卡。附件放不下时按此顺序保，商品主图和在屏主位卡不得静默丢。
- 顺序表只列实际素材：没有的素材不占编号、不留 `empty` 行；表定稿后新增素材（补细节图、加角色/场景）追加到表末取下一个编号，已有编号不重排。
- 产品图不参与"美化想象"：图里看不到的背面、内胆、配件，不写成确定事实；需要第二视角就请用户补细节图。
- 卡图未生成时状态记 `pending`，提示词照写 Ref2VA；只有用户明确拒绝建卡才回退 T2VA。
- 需要参考图作为首帧/尾帧时，改用 I2VA / FL2VA，不要硬塞进 Ref2VA；卡图本身不当首帧。

---

## 6. 景别与运镜

### 景别与机位（英文固定说法）

| 中文 | 英文 |
| --- | --- |
| 微距 | extreme close-up / macro shot |
| 近景 | close-up |
| 中近景 | medium close-up |
| 中景 | medium shot |
| 中全景 | medium-wide shot |
| 全景 | wide shot |
| 平视 | eye-level |
| 略俯 | slight high angle |
| 略仰 | slight low angle |
| 侧面 45 度 | a 45-degree profile angle |

### 运镜

完整运镜 = 运动类型 + 幅度 + 速度，幅度和速度只在有意义时写：

| 维度 | 可用表达 |
| --- | --- |
| 类型 | `Zoom In / Zoom Out`、`Push In / Pull Out`、`Pan Left / Pan Right`、`Truck Left / Truck Right`、`Tilt Up / Tilt Down`、`Pedestal Up / Pedestal Down`、`Arc Shot`、`Tracking Shot`、`Static Shot`、`Shake Slightly / Shake Strongly`、`POV`、`Roll Clockwise / Roll Counterclockwise` |
| 幅度 | `with small amplitude` / `with large amplitude` |
| 速度 | `at slow speed` / `at fast speed` |

写成自然句，不堆标签：

```
The camera tracks her hands with small amplitude at slow speed and settles on the flask at chest height.
The camera holds a static shot as she lowers her eyes.
```

中文老写法 ↔ H3 写法：

| 老写法 | H3 写法 |
| --- | --- |
| 缓慢推近 | `pushes in with small amplitude at slow speed` |
| 固定机位 | `holds a static shot` |
| 缓慢上摇 | `tilts up at slow speed` |
| 轻微手持晃动 | `shakes slightly` |
| 侧面 45 度，机位不动 | `a 45-degree profile angle with the camera holding a static shot` |

### 构图纪律

- 一镜一个主动作；动作超过两个就拆镜。
- 景别配比：中近景对白约 60%，商品微距/手部约 30%，全景交代约 10%。
- 商品镜头必须写状态与朝向：`in her hands / on the table / half-open cap / cap facing the lens / seen from above`。
- 反转前留 0.3–0.5 秒静止，用 `the camera holds a static shot for a beat` 或一次呼吸完成。

---

## 7. 台词、说话人与旁白

### 说话人编号

- 发声主体用稳定 ID：`(S1)`、`(S2)`；两人同时说话用 `(S1,S2)`。
- 按**本条实际发声顺序**从 S1 起编；跨镜编号不要求一致，一致性靠锚点句。
- 不发声的角色不给 ID。
- 第一次出现时，在 `<d>` 外写清身份与声音：年龄、性别、音高、音色、语速。

```
The new consort (S1), a young woman with a low, steady voice, says: <d>[Chinese] 给我一炷香。</d>
```

### 台词写法

- `<d>` 内只放语言标签和台词原文：`<d>[Chinese] 凉了的茶，也敢端上来。</d>`。
- 保留原词原意，不改写、不翻译、不补感叹词；标点用基本句读，去掉重复波浪号和装饰符号。
- 一句台词只承担一个意思；一条 4–6 秒镜头的中文台词控制在 20–25 字以内，2–3 秒短切镜控制在 8 字以内。
- 旁白用固定短语 `says in an off-screen voiceover`，并在 `<d>` 后补一句嘴唇闭合：

```
The chief consort (S1) says in an off-screen voiceover: <d>[Chinese] 别人争的是恩宠，它争的是回购。</d> while her lips remain completely closed.
```

- 台词跨切点时，在切点两侧写 `<scenetrans>` 并注明声音延续；被结尾截断时用 `<cutoff>`。单镜提示词一般用不到。
- 成片要统一后期配音时，把 `<d>` 换成呼吸、气声或停顿的动作描述，并注明"后期配音"；不要让 H3 生成人声。
- 字幕、落款字卡不进提示词，走后期。

### 口型风险

长台词优先给侧脸、低头、过肩或背影；必须正脸时，把说话动作拆到 2 个短镜，或改为画外音。

---

## 8. 声音两个字段

### overall_soundscape

- 1–4 句英文，一段话：环境底噪 + 物理动作声 + 非语言人声（呼吸、笑、叹气、脚步、衣料摩擦、瓷器碰撞、烛芯爆响）。
- 不重复台词、不写配乐。
- 只有用户明确要求全片静音时才写 `N/A`。

### non_diegetic_music

- 1–3 句英文：器乐、速度、节奏、动态走向。
- 只写角色听不到、观众能听到的配乐；角色能听到的乐器/广播/手机音乐属于画内声，写进正文。
- 不用 "tense""epic""emotional" 这类抽象情绪词，写清楚是什么乐器、多快、怎么变化。
- 没有配乐写 `N/A`。

宫斗可用音色词：`guzheng`、`dizi`、`low drum`、`bronze bell`、`struck wood`、`sustained low drone`。

---

## 9. 负向词转正向锁定

H3 没有负向字段。不要写 `negative:`，也不要追加"不要/禁止"清单；把约束折进描述句，每条约束贴着它保护的对象写。

| 原负向意图 | H3 正向写法 |
| --- | --- |
| 人脸畸变、多手指 | `anatomically correct hands with five fingers on each hand`；自然肤色与面部比例写进锚点 |
| 换装、换发型、颜色漂移 | `wearing exactly the outfit, hair ornament, and colors described in the character anchor sentence throughout the shot` |
| 商品变形、变色、零件增减 | `the product keeps the exact shape, color, part count, and label position shown in <Picture 1>` |
| 标签乱码、伪文字 | `the label stays a small, plain white patch` |
| 画外多余人物、群众抢镜 | `only the three named characters are present; the background stays empty` |
| 现代元素穿帮 | `the room contains only period-appropriate wooden, bronze, ceramic, and fabric objects` |
| 字幕、水印、伪文字 | `the frame shows only the room, the characters, and the blank product label; all text stays off-screen in post` |
| 过度磨皮、塑料皮肤 | `natural skin texture with visible pores and soft candle highlights` |
| 低清、噪点、过曝 | `clean, high-detail image with controlled highlights` |
| 快速甩镜、跳切 | `one continuous static shot` 或 `a single slow camera move` |
| 食品夸张流心、错误断面 | `the filling stays contained and the cross-section is clean` |
| 护肤品医疗场景 | `the scene stays in a private dressing room with period jars, mirrors, and silk cloth` |
| 服装不符合版型飘动 | `the robe fabric falls along its cut and moves only with her steps` |

约束句要短，只挂在需要保护的镜头上，不必每镜复述全部。

---

## 10. 时长与切分

- 一条提示词 = 一次生成 = 一个分镜，时长 **2–8 秒**。
- 常规对白/动作镜 4–8 秒；开场钩子、单动作反应、商品微距、落款可 2–3 秒。
- 全片短切镜不超过 3 个；6–10 镜对应 30–45 秒。
- 15 秒版：3 镜（4s + 5s + 6s），或 3 镜 + 1 个 2–3 秒短切。
- 工具侧时长与提示词一致；4 秒镜头不要写 8 秒的动作量。
- 一镜内确需剪切时才写 `[Shot 2] At 00:0X.XXX`；切点严格递增，最后一刀落在时长内。H3 更适合单条连续镜头，不要用一条 8 秒塞三个动作。
- 商品首次出现不晚于第 8 秒；前 3 秒必须有冲突或身份压制。

---

## 11. 平台转换

H3 是默认格式。给其他平台时按目标平台的字段重写，**不要**把六段标题原样粘过去。

| 平台 | 转换要点 |
| --- | --- |
| MiniMax H3（默认） | Ref2VA 六段 / T2VA 三字段；英文正文；台词 `<d>[Chinese]`；参考图定义成 `<Subject>`；无负向字段 |
| Seedance 2.5 | 压成一段分号连写长句；角色锚点与商品锁定放最前；台词语句照抄；单镜 4–8 秒；平台有负向字段时，把第 9 节的意图翻回该平台负向词 |
| 可灵 / 即梦 | 单镜 ≤2 人；优先中近景；用中文单段；参考标签全部去掉，改写成描述 |
| Midjourney | 只出角色定妆图和商品氛围图，不连镜；`--ar 9:16 --style raw`；锚点写成逗号分隔关键词 |

通用：**不要**把整份脚本作为一条 prompt；长片拆成 2–8 秒镜头分别生成（常规 4–8 秒），再在剪辑里组接。

---

## 12. 完整示例

### 示例 A · Ref2VA（商品献礼镜，4 秒，挂商品图 + 两张角色卡 + 场景卡）

```
subject_definitions:
<Subject 1> is the vacuum flask in <Picture 1>, a matte dark-green cylindrical 500 ml body with a narrowed shoulder, a brushed dark-gold screw cap, a plain unpatterned surface, and a small blank white label near the lower front.
<Subject 2> is the chief consort in <Picture 2>, a woman in her early forties with a broad square face, a low bun pinned with a kingfisher-feather ornament, a vermilion gold-woven court robe, and an old jade ring on her left ring finger; her gaze is heavy and she does not smile.
<Subject 3> is the new consort in <Picture 3>, a woman in her early twenties with an oval face, a high coiled bun with a single plain silver hairpin, a dark-teal satin high-collar dress, and a faint scar at the tail of her right eyebrow; her eyes stay lowered.
<Subject 6> is the inner hall in <Picture 4>, a new-Chinese palace inner hall with dark wooden lattice screens on frame right and a plain folding screen at frame left; fixed landmarks are the lattice door at right third, the bronze censer at bottom center, and the dark table at center.

summary:
[reference generation] A single-shot palace-drama beat in which the new consort presents <Subject 1> to the seated chief consort, preserving <Subject 1>, <Subject 2>, <Subject 3>, and <Subject 6> from their reference images.

retention_analysis:
<Subject 1> (appears in [Shot 1]): fully_preserved - the matte dark-green color, cylindrical shape, narrowed shoulder, dark-gold cap, blank white label position, and part count stay identical to <Picture 1> throughout the shot.
<Subject 2> (appears in [Shot 1]): fully_preserved - the square face, low bun with the kingfisher-feather ornament, vermilion gold-woven robe, and old jade ring stay identical to <Picture 2>.
<Subject 3> (appears in [Shot 1]): fully_preserved - the oval face, high coiled bun with the plain silver hairpin, dark-teal satin dress, and the scar at the tail of the right eyebrow stay identical to <Picture 3>.
<Subject 6> (appears in [Shot 1]): fully_preserved - the layout, the landmark positions, the materials, and the light baseline stay identical to <Picture 4>.

detailed_description:
cinematic new-Chinese palace period drama, realistic photographic look, soft side-backlight with warm candle fill, desaturated vermilion, dark-teal, and dark-gold palette, authentic silk and ceramic material response, the product color as the only saturated accent, shallow filmic depth of field, 9:16 vertical framing. At the start of the shot, the cold tea cup rests at the table edge and the chief consort's gaze is still lowered.
[Shot 1] A medium shot frames <Subject 6> with its lattice door at frame right, the bronze censer at bottom center, and the dark table at center; a deep-red woven carpet runs toward the camera. <Subject 2> sits behind the table at frame right, her gaze lowered and her expression cold. <Subject 3> (S1) enters from frame left, stops three steps before the table, and raises <Subject 1> to chest height with both hands, the dark-gold cap facing the lens. Her sleeves sway with the movement as she speaks in a low, steady young female voice (S1): <d>[Chinese] 给我一炷香。</d> The camera tracks her hands with small amplitude at slow speed and settles on the flask at chest height; the chief consort does not look up. <Subject 1> remains fully visible, its matte dark-green body and dark-gold cap matching <Picture 1>; both women stay identical to their reference images.

overall_soundscape:
Low indoor room tone with a faint candle flicker. Soft fabric rustle and light footsteps cross the carpet, followed by the quiet creak of a wooden chair.

non_diegetic_music:
A single guzheng pluck at a slow tempo over a sustained low drone, with one soft struck-wood pulse as the camera settles.
```

### 示例 B · T2VA（开场压制镜，4 秒，仅当用户拒绝建卡时的回退写法）

```
integrated_multimodal_description: [Shot 1] Cinematic new-Chinese palace period drama, realistic photographic look, soft side-backlight with warm candle fill, desaturated vermilion, dark-teal, and dark-gold palette, shallow filmic depth of field, 9:16 vertical framing. A medium close-up at a slight high angle frames a dark wooden table in a new-Chinese palace hall at night, with a plain folding screen and two candlesticks blurred behind it. The chief consort (S1), a woman in her early forties with a broad square face, a low bun pinned with a kingfisher-feather ornament, a vermilion gold-woven court robe, and an old jade ring on her left ring finger, pushes a white porcelain tea cup back to the edge of the table with one hand; the tea inside is cold and a thin film floats on the surface. Her fingertip lingers on the rim for a beat. She says in a low, heavy middle-aged female voice (S1): <d>[Chinese] 凉了的茶，也敢端上来。</d> She withdraws her hand and looks off frame left. The camera holds a static shot as candlelight flickers across the cup and her sleeve.

overall_soundscape: Porcelain scrapes softly across the wood, followed by a faint clink as the cup settles. Low room tone and a candle-wick crackle continue underneath.

non_diegetic_music: A sparse guzheng phrase at a slow tempo over a sustained low drone, ending on a single plucked note.
```

> 示例按 4 秒单镜压缩篇幅；真实生成时 `detailed_description` 可扩到 350–500 词，补足环境层次和参考生效点。示例 A 的附件顺序即挂载顺序：`<Picture 1>` 商品 → `<Picture 2>`/`<Picture 3>` 角色卡 → `<Picture 4>` 场景卡。

---

## 13. 角色卡图像提示词

每个主要角色一份（全片 ≤4 人），默认生图模型 **Qwen-Image**，16:9 横版生产参考图。提示词要自洽：粘贴即出图，不依赖上下文。卡图只作身份参考，不当视频首帧。

### 13.1 固定字段

1. **身份锁**：英文锚点句逐字放入，不改写。
2. **视图排布**：中央 3/4 全身（最大）、左侧正面全身、右侧侧面全身、右下背面全身。
3. **表情条**：基线 / 冷或怒 / 微讶，只换表情，不换妆造。
4. **细节特写**：脸、发型与发饰、标志配饰、手部与袖口。
5. **图内标注**：角色中文名 + 功能位 + 英文名，写在人物旁。
6. **背景与光**：中性灰无缝背景，均匀柔光；无场景、无商品、无其他人物、无剧情动作。
7. **风格锁**：卡图用中/英文串原样附加。
8. **负向**（图像模型可用）：多余人物、商品、剧情动作、多余文字、水印、畸形手指、塑料皮肤、卡通感、现代元素、高饱和色。

### 13.2 模板

```
生成一张 16:9 横版角色生产参考图，中性灰无缝背景，均匀柔光。

角色身份锁（原样保留，不得改写）：
<英文锚点句>

画面排布：
- 中央：3/4 全身主视角，占画面最大面积
- 左侧：正面全身；右侧：侧面全身；右下：背面全身
- 底部表情条：基线 / 冷或怒 / 微讶，同一妆造只换表情
- 上方细节特写：脸部五官、发型与发饰；另补袖口/手部与标志配饰

图内标注：<角色中文名> / <功能位> / <英文名>，写在人物旁，字迹清晰。

材质：丝绸有真实重量与垂坠，刺绣与金属配饰有细腻反光；皮肤保留毛孔与自然纹理。

风格：电影感新中式宫廷写实影像，朱红黛青暗金低饱和宫廷色，丝绸与器物真实材质，生产参考图。cinematic new-Chinese palace period drama, realistic photographic look, desaturated vermilion, dark-teal, and dark-gold palette, authentic silk and ceramic material response, production reference sheet.

负向：多余人物、商品、剧情动作、多余文字、水印、畸形手指、塑料皮肤、卡通感、现代元素、高饱和色。
```

### 13.3 示例（主位娘娘）

```
生成一张 16:9 横版角色生产参考图，中性灰无缝背景，均匀柔光。

角色身份锁（原样保留）：
The chief consort is a woman in her early forties with a broad square face, a low bun pinned with a kingfisher-feather ornament, a vermilion gold-woven court robe, and an old jade ring on her left ring finger; her gaze is heavy and she does not smile.

画面排布：中央 3/4 全身主视角；左侧正面全身；右侧侧面全身；右下背面全身；底部表情条（基线 / 冷 / 微讶）；上方细节特写（方圆脸与眉眼、低髻与点翠步摇、左手旧玉戒、袖口织金纹）。

图内标注：主位娘娘 / 裁决者 / The Chief Consort。

风格：电影感新中式宫廷写实影像，朱红黛青暗金低饱和宫廷色，丝绸与器物真实材质，生产参考图。cinematic new-Chinese palace period drama, realistic photographic look, desaturated vermilion, dark-teal, and dark-gold palette, authentic silk and ceramic material response, production reference sheet.

负向：多余人物、商品、剧情动作、多余文字、水印、畸形手指、塑料皮肤、卡通感、现代元素、高饱和色。
```

---

## 14. 场景卡图像提示词

每个场景一份（全片 ≤3 个），9:16 竖版，与成片画幅一致。只描述环境，不出现人物、人群、剪影、手、脸，商品也不进场景卡。

### 14.1 固定字段

1. **卡名 + 戏内功能 + 光位基线**：与场景锁定表一致。
2. **空间总览**：结构、进深、地面材质、主色。
3. **固定地标 3–5 个**：写明竖构图里的屏幕位置。
4. **环境道具白名单**：只列年代内器物，不列商品。
5. **光态**：主光 + 补光 + 氛围，与光位基线一致。
6. **大气细节**：烛烟、薄尘、织物垂坠，克制。
7. **风格锁 + 负向**。

### 14.2 模板

```
生成一张 9:16 竖版场景生产参考图，无人物、无商品。

场景卡名：<场景卡名>（<戏内功能>）

空间总览：<空间结构、进深、地面材质、主色>
固定地标（全片位置不变）：
- <地标 1>：<屏幕位置>
- <地标 2>：<屏幕位置>
环境道具白名单：<年代内器物清单>
光位基线：<主光方向 + 补光 + 轮廓光/氛围>
大气细节：<烛烟 / 薄尘 / 织物垂坠，克制>

风格：电影感新中式宫廷写实影像，朱红黛青暗金低饱和宫廷色，丝绸与器物真实材质，生产参考图。cinematic new-Chinese palace period drama, realistic photographic look, desaturated vermilion, dark-teal, and dark-gold palette, authentic silk and ceramic material response, production reference sheet.

负向：人物、人群、剪影、手、脸、商品、字幕、水印、现代器物、卡通感、高饱和色。
```

### 14.3 示例（内殿正堂）

```
生成一张 9:16 竖版场景生产参考图，无人物、无商品。

场景卡名：场景-01 内殿正堂（主场景，全片 10 镜）

空间总览：新中式宫廷内殿正堂，深色木格栅与素面折屏围合，纵深约一进半，深红织毯自前景铺向主位，主色朱红、黛青、暗金。

固定地标：
- 格子门：画面右侧 1/3
- 铜炉：画面下缘居中
- 深色长案：画面中央
- 素面折屏：画面左侧 1/4

环境道具白名单：木案、铜炉、白瓷茶盏、烛台、织锦坐垫、素面折屏。
光位基线：主光为画面右侧柔和侧逆光，补光来自下方暖烛，台面与器皿落于清晰亮部，环境暗部通透。
大气细节：烛焰轻晃、空气中极薄烟尘、织毯与帷幔自然垂坠。

风格：电影感新中式宫廷写实影像，朱红黛青暗金低饱和宫廷色，丝绸与器物真实材质，生产参考图。cinematic new-Chinese palace period drama, realistic photographic look, desaturated vermilion, dark-teal, and dark-gold palette, authentic silk and ceramic material response, production reference sheet.

负向：人物、人群、剪影、手、脸、商品、字幕、水印、现代器物、卡通感、高饱和色。
```

---

## 15. 全局素材参考顺序表

这是全片参考素材的唯一事实源，先于任何镜头提示词建立；表内只列实际素材，跨镜不改编号。

### 15.1 表结构与编号

| 顺序 | Subject ID | 类型 | 精确卡名 | 参考图 | 状态 | 出现镜头 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Subject 1 | 商品主图 | 商品-主图 | 用户图 1 | ready | 3,4,5,6,7,9,10 |
| 2 | Subject 2 | 角色卡 | 角色-01 主位娘娘 | 角色卡图 | pending | 1,3,6,7,8,9 |
| 3 | Subject 3 | 角色卡 | 角色-02 新晋小主 | 角色卡图 | pending | 3,4,6 |
| 4 | Subject 4 | 角色卡 | 角色-03 掌事嬷嬷 | 角色卡图 | pending | 2,5,7 |
| 5 | Subject 5 | 角色卡 | 角色-04 贴身宫女 | 角色卡图 | pending | 9 |
| 6 | Subject 6 | 场景卡 | 场景-01 内殿正堂 | 场景卡图 | pending | 全片 |

- 按实际素材数量连续编号，1 到 N，不留空位、不设 `empty` 占位行。
- 建表顺序 = 挂载顺序：商品主图 → 商品细节（有才编，占 Subject 2）→ 角色卡（按角色表顺序）→ 场景卡（按场景表顺序）。
- 表定稿后 `<Subject N>` 全片不变；后续新增素材（补细节图、加角色/场景）取表末下一个编号追加，已有编号不重排。删除素材才全表顺延重编，并同步所有镜头提示词。
- 状态只有两种：`ready`（图已有）、`pending`（卡提示词已出、图未生成）；`pending` 照写 Ref2VA。
- 上例为 1 张商品图 + 4 角色 + 1 场景；没有细节图，所以角色卡从 Subject 2 起。若用户给了第二张商品图，它占 Subject 2，后续编号顺延一位。
- 表的顺序就是附件挂载顺序：商品主图 → 商品细节（有则）→ 在屏角色卡 → 本镜场景卡。

### 15.2 每镜附件映射

分镜清单"素材挂载"列写 Subject 组合，例如镜 4 为 `S1+S3+S6`，则该条附件为：

- `<Picture 1>` = 商品主图 → `<Subject 1>`
- `<Picture 2>` = 角色-02 新晋小主卡图 → `<Subject 3>`
- `<Picture 3>` = 场景-01 卡图 → `<Subject 6>`

`subject_definitions` 里逐条写明"谁在 Picture 几"，编号沿用顺序表。改镜时同步改"出现镜头"列。

### 15.3 预算与降级

- 单条放不下全部附件时，保的顺序：商品主图 → 在屏角色卡 → 场景卡 → 商品细节图。
- 商品主图和在屏主位角色卡不得静默丢；必须取舍就拆镜，或把取舍交给用户确认。
- 卡图 `pending` 照写 Ref2VA，不静默降级成 T2VA。
- 只有用户明确拒绝建卡、且本镜确无商品时，才用 T2VA 回退写法。
