# 交付示例（格式参照）

> 示例商品为虚构演示用：某款哑光墨绿 500ml 双层保温壶。数字来自"客户提供的材料"，仅演示格式，实际使用时全部替换为客户真实信息。
>
> 本示例按 v1.2 交付格式：角色卡 / 场景卡 → 全局素材参考顺序表 → 脚本 → 分镜 → H3 提示词。卡提示词只给一份完整样板，其余按同模板替换；实际交付每张都写全。

---

## 一、创意一句话

失了茶温就要失体面的老嬷嬷，用一只单手就能开、倒着放也不漏的壶，把"凉茶"这桩旧罪当场翻案。

---

## 二、角色一致性表 + 场景锁定表 + 英文锚点块

### 角色表（4 人，无群演）

| 角色     | 身份   | 年龄段 | 脸型         | 发型                 | 服装主色 | 标志物           | 站位               | 说话节奏               | 禁止变化                   |
| -------- | ------ | ------ | ------------ | -------------------- | -------- | ---------------- | ------------------ | ---------------------- | -------------------------- |
| 主位娘娘 | 裁决者 | 38–42  | 方圆脸       | 低髻，一支点翠步摇   | 朱红织金 | 左手无名指旧玉戒 | 案后居中偏右       | 慢，一句一意，尾音下沉 | 不加耳坠、不换发型、不站起 |
| 新晋小主 | 献礼者 | 22–25  | 鹅蛋脸       | 高盘发，一支素银簪   | 黛青缎面 | 右眉尾一道浅疤   | 案前左侧半步       | 短句，先低后稳         | 不换衣色、不摘银簪         |
| 掌事嬷嬷 | 质疑者 | 45–50  | 长脸，颧骨高 | 一丝不乱的圆髻，无饰 | 暗褐素缎 | 腰间一串铜钥匙   | 案前右侧，半步靠后 | 快，句短带刺           | 不换衣色、钥匙不离腰       |
| 贴身宫女 | 递物者 | 18–20  | 圆脸         | 双丫髻               | 藕荷布衣 | 袖口一块补丁     | 门边，只入画一次   | 只说四个字以内         | 不开口超过一句             |

### 场景锁定表（1 个场景）

| 场景卡名         | 场景               | 戏内功能                                  | 固定地标（含屏幕位置）                                       | 光位基线                                       | 出现镜    |
| ---------------- | ------------------ | ----------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------- | --------- |
| 场景-01 内殿正堂 | 新中式宫廷内殿正堂 | 全片唯一主场景，压制/献礼/验货/落款都在此 | 格子门：右 1/3；铜炉：下缘居中；深色长案：中央；素面折屏：左 1/4 | 主光：右侧柔和侧逆光；补光：下方暖烛；暗部通透 | 全片 1–10 |

### 英文锚点块（卡提示词与镜头提示词逐字复制）

- The chief consort is a woman in her early forties with a broad square face, a low bun pinned with a kingfisher-feather ornament, a vermilion gold-woven court robe, and an old jade ring on her left ring finger; her gaze is heavy and she does not smile.
- The new consort is a woman in her early twenties with an oval face, a high coiled bun with a single plain silver hairpin, a dark-teal satin high-collar dress, and a faint scar at the tail of her right eyebrow; her eyes stay lowered.
- The matron is a woman in her late forties with a long face and high cheekbones, a tightly coiled bun with no ornament, a dark-brown plain silk dress, and a ring of brass keys at her waist; the corners of her mouth turn down.
- The maid is a girl of eighteen with a round face, twin buns, a lotus-pink cotton dress, and a patched cuff.
- The product is a matte dark-green cylindrical 500 ml vacuum flask with a narrowed shoulder, a brushed dark-gold screw cap, a plain unpatterned body, and a small blank white label near the lower front.
- Scene Hall-01: a new-Chinese palace inner hall with dark wooden lattice screens on frame right and a plain folding screen at frame left; fixed landmarks: lattice door at right third, bronze censer at bottom center, dark table at center, folding screen at left quarter; light baseline: soft side-backlight from frame right with warm candle fill from below; props: wooden table, bronze censer, white porcelain cups, candlesticks, silk cushions, folding screen.
- Light: soft side-backlight from frame right with warm candle fill from below; faces clearly lit; cinematic; 9:16 vertical; vermilion, dark teal, and dark gold palette with the flask's matte dark green as the only saturated accent.
- Sound base: low indoor room tone, faint candle crackle, and soft silk rustle; sparse guzheng and a sustained low drone at a slow tempo.

---

## 三、角色卡与场景卡生成提示词

默认生图模型 Qwen-Image。卡图只作身份/环境参考，不当视频首帧。

### 角色卡 01 · 主位娘娘（完整样板）

```
生成一张 16:9 横版角色生产参考图，中性灰无缝背景，均匀柔光。

角色身份锁（原样保留）：
The chief consort is a woman in her early forties with a broad square face, a low bun pinned with a kingfisher-feather ornament, a vermilion gold-woven court robe, and an old jade ring on her left ring finger; her gaze is heavy and she does not smile.

画面排布：中央 3/4 全身主视角（最大）；左侧正面全身；右侧侧面全身；右下背面全身；底部表情条（基线 / 冷 / 微讶）；上方细节特写（方圆脸与眉眼、低髻与点翠步摇、左手旧玉戒、袖口织金纹）。

图内标注：主位娘娘 / 裁决者 / The Chief Consort。

风格：电影感新中式宫廷写实影像，朱红黛青暗金低饱和宫廷色，丝绸与器物真实材质，生产参考图。cinematic new-Chinese palace period drama, realistic photographic look, desaturated vermilion, dark-teal, and dark-gold palette, authentic silk and ceramic material response, production reference sheet.

负向：多余人物、商品、剧情动作、多余文字、水印、畸形手指、塑料皮肤、卡通感、现代元素、高饱和色。
```

### 其余角色卡（同模板替换身份锁、细节特写与标注）

- **角色卡 02 · 新晋小主**：身份锁用上表第二句；细节特写改"鹅蛋脸、高盘发与素银簪、右眉尾浅疤、黛青缎面高领"；标注"新晋小主 / 献礼者 / The New Consort"。
- **角色卡 03 · 掌事嬷嬷**：身份锁用上表第三句；细节特写改"长脸高颧骨、圆髻无饰、暗褐素缎、腰间铜钥匙串"；标注"掌事嬷嬷 / 质疑者 / The Matron"。
- **角色卡 04 · 贴身宫女**：身份锁用上表第四句；细节特写改"圆脸、双丫髻、藕荷布衣、袖口补丁"；标注"贴身宫女 / 递物者 / The Maid"。

### 场景卡 01 · 内殿正堂

```
生成一张 9:16 竖版场景生产参考图，无人物、无商品。

场景卡名：场景-01 内殿正堂（全片唯一主场景）

空间总览：新中式宫廷内殿正堂，深色木格栅与素面折屏围合，纵深约一进半，深红织毯自前景铺向主位，主色朱红、黛青、暗金。

固定地标（全片位置不变）：
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

## 四、全局素材参考顺序表

| 顺序 | Subject ID | 类型     | 精确卡名         | 参考图   | 状态    | 出现镜头       |
| ---- | ---------- | -------- | ---------------- | -------- | ------- | -------------- |
| 1    | Subject 1  | 商品主图 | 商品-主图        | 用户图 1 | ready   | 3,4,5,6,7,9,10 |
| 2    | Subject 2  | 角色卡   | 角色-01 主位娘娘 | 角色卡图 | pending | 1,3,6,7,8,9    |
| 3    | Subject 3  | 角色卡   | 角色-02 新晋小主 | 角色卡图 | pending | 3,4,6          |
| 4    | Subject 4  | 角色卡   | 角色-03 掌事嬷嬷 | 角色卡图 | pending | 2,5,7          |
| 5    | Subject 5  | 角色卡   | 角色-04 贴身宫女 | 角色卡图 | pending | 9              |
| 6    | Subject 6  | 场景卡   | 场景-01 内殿正堂 | 场景卡图 | pending | 全片           |

本例只有 1 张商品图，没有细节图，所以不设"商品细节"行，角色卡从 Subject 2 起编；编号连续、无空位。若补第二张商品图，它占 Subject 2，其后编号顺延一位。挂载顺序：商品主图 → 商品细节（有则）→ 在屏角色卡 → 场景卡。`<Picture N>` 按每条实际附件从 1 重新编。

---

## 五、完整脚本（42 秒）

| 时间   | 画面/动作                                        | 台词                                           | 商品卖点             | 字幕/音效                              | 节奏功能      |
| ------ | ------------------------------------------------ | ---------------------------------------------- | -------------------- | -------------------------------------- | ------------- |
| 0–4s   | 主位把茶盏推回案沿，盏中茶水已凉，茶面浮着一层膜 | 主位："凉了的茶，也敢端上来。"                 | —                    | 字幕：凉了的茶，也敢端上来             | 开场压制      |
| 4–7s   | 掌事嬷嬷低头，指尖在盏沿上抹了一下，抬眼看新人   | 嬷嬷："这宫里，谁的茶不是凉的。"               | —                    | 瓷盏磕案的钝响                         | 加压（短切）  |
| 7–11s  | 新人上前，双手托出一只墨绿壶，壶身哑光，暗金旋盖 | 新人："给我一炷香。"                           | 商品首次入画         | 布料摩擦声                             | 献礼          |
| 11–16s | 单指按压旋盖，盖子弹开一条缝，拇指一掀           | 新人："一只手，就够。"                         | ① 单手弹盖           | 一声清脆"嗒"                           | 卖点 1        |
| 16–21s | 壶被倒置在案上，嬷嬷的手按在壶底，无水渗出       | 嬷嬷（冷笑）："倒着放，想淹了本宫的案？"       | ② 倒置不漏           | 水滴声：无                             | 卖点 2 + 挑刺 |
| 21–27s | 新人把盏中凉茶倒掉，从壶中斟出一盏，热气冲上镜头 | 新人："您先闻。"                               | ③ 六小时后仍烫       | 热水入盏声，热气特写                   | 卖点 3        |
| 27–31s | 嬷嬷抢过盏，先试指尖，再抿一口，动作停住         | 嬷嬷："这是今早的？"                           | 反转支点             | 全场静 0.4 秒                          | 反转停顿      |
| 31–36s | 主位放下手中凉盏，抬手示意                       | 主位："本宫倒要看看，它凭什么得宠。"           | —                    | 字幕：凭什么得宠                       | 权力倒向      |
| 36–40s | 壶被端走，宫女双手接过，退到门边                 | 主位："传下去，往后这宫里，茶要烫的。"         | 商品获得制度认可     | 群声："是。"                           | 晋位          |
| 40–42s | 微距：壶身墨绿哑光，暗金旋盖，热气自壶口升起     | 旁白："<商品名>｜六小时，还是烫的。下方自取。" | 品牌 + 利益点 + 指令 | 字幕：<商品名>｜六小时还是烫的｜点下方 | 落款（短切）  |

---

## 六、分镜清单

> 转场在剪辑层完成；H3 每条提示词只生成一个连续镜头，不含转场效果。

| 镜号 | 时长 | 景别       | 机位/运动                    | 素材挂载    | 人物站位与动作                                   | 商品状态               | 台词                         | 转场       |
| ---- | ---- | ---------- | ---------------------------- | ----------- | ------------------------------------------------ | ---------------------- | ---------------------------- | ---------- |
| 1    | 4s   | 中近景     | 平视固定，略俯               | S2+S6       | 主位居案后偏右，单手推盏                         | 不出现                 | 凉了的茶，也敢端上来         | 硬切       |
| 2    | 3s   | 近景       | 平视固定                     | S4+S6       | 嬷嬷立右侧半步，指抹盏沿                         | 不出现                 | 这宫里，谁的茶不是凉的       | 声音先入   |
| 3    | 4s   | 中景转近景 | 缓慢跟手                     | S1+S2+S3+S6 | 新人自画左入，案前三步停，双手托壶；主位案后偏右 | 手中，正面，盖合       | 给我一炷香                   | 硬切       |
| 4    | 5s   | 微距       | 固定，浅景深                 | S1+S3+S6    | 新人只手入画，单指按压旋盖                       | 手中，顶视偏侧，盖弹开 | 一只手，就够                 | 动作接动作 |
| 5    | 5s   | 近景       | 平视固定                     | S1+S4+S6    | 嬷嬷右手按壶底，壶倒置于案                       | 案上，倒置，盖半开     | 倒着放，想淹了本宫的案？     | 硬切       |
| 6    | 6s   | 中近景     | 略仰，缓推                   | S1+S2+S3+S6 | 新人斟茶，热气上升，盏递向前；主位案后           | 手中，倾斜，盖已开     | 您先闻                       | 蒸汽过场   |
| 7    | 4s   | 近景       | 侧面 45 度，固定 0.4s 后缓推 | S1+S2+S4+S6 | 嬷嬷试指尖、抿一口、停住；主位在景深处           | 右手正握，贴近身侧     | 这是今早的？                 | 静音切     |
| 8    | 5s   | 中景       | 平视固定                     | S2+S6       | 主位放下凉盏，抬手                               | 案上（画外）           | 本宫倒要看看，它凭什么得宠   | 硬切       |
| 9    | 4s   | 全景转中景 | 缓上摇                       | S1+S2+S5+S6 | 宫女自门边入，双手接壶后退；主位抬手             | 双手托，正面           | 传下去，往后这宫里，茶要烫的 | 摇移       |
| 10   | 2s   | 微距       | 正顶光，固定                 | S1+S6       | 无人物，壶居中                                   | 案上，正面，盖合       | 旁白落款                     | 淡出       |

---

## 七、逐镜 H3 提示词（节选 2 条，实际交付每镜一条）

> 镜 1 无商品、有角色卡与场景卡 → Ref2VA；镜 3 含商品 + 两张角色卡 + 场景卡 → Ref2VA。示例按 4 秒单镜压缩篇幅，实际生成时 `detailed_description` 可扩到 350–500 词。

**镜 1 · Ref2VA（4 秒，S2+S6）**

```
subject_definitions:
<Subject 2> is the chief consort in <Picture 1>, a woman in her early forties with a broad square face, a low bun pinned with a kingfisher-feather ornament, a vermilion gold-woven court robe, and an old jade ring on her left ring finger; her gaze is heavy and she does not smile.
<Subject 6> is the inner hall in <Picture 2>, a new-Chinese palace inner hall with dark wooden lattice screens on frame right and a plain folding screen at frame left; fixed landmarks are the lattice door at right third, the bronze censer at bottom center, and the dark table at center.

summary:
[reference generation] A single-shot opening pressure beat in which the chief consort rejects a cup of cold tea, preserving <Subject 2> and <Subject 6> from their reference images.

retention_analysis:
<Subject 2> (appears in [Shot 1]): fully_preserved - the square face, low bun with the kingfisher-feather ornament, vermilion gold-woven robe, and old jade ring stay identical to <Picture 1>.
<Subject 6> (appears in [Shot 1]): fully_preserved - the layout, the landmark positions, the materials, and the light baseline stay identical to <Picture 2>.

detailed_description:
cinematic new-Chinese palace period drama, realistic photographic look, soft side-backlight with warm candle fill, desaturated vermilion, dark-teal, and dark-gold palette, authentic silk and ceramic material response, the product color as the only saturated accent, shallow filmic depth of field, 9:16 vertical framing. At the start of the shot, the hall is quiet and the cold tea cup sits near the table edge.
[Shot 1] <Subject 6> is framed with the lattice door at frame right, the bronze censer at bottom center, and the dark table at center; the deep-red woven carpet runs toward the camera. <Subject 2> sits behind the table at frame right, one hand pushing a white porcelain tea cup back to the edge; the tea inside is cold and a thin film floats on the surface. Her fingertip lingers on the rim for a beat. She says in a low, heavy middle-aged female voice (S1): <d>[Chinese] 凉了的茶，也敢端上来。</d> She withdraws her hand and looks off frame left. The camera holds a static shot as candlelight flickers across the cup and her sleeve, and she stays identical to <Picture 1>.

overall_soundscape:
Porcelain scrapes softly across the wood, followed by a faint clink as the cup settles. Low room tone and a candle-wick crackle continue underneath.

non_diegetic_music:
A sparse guzheng phrase at a slow tempo over a sustained low drone, ending on a single plucked note.
```

**镜 3 · Ref2VA（4 秒，S1+S2+S3+S6）**

```
subject_definitions:
<Subject 1> is the vacuum flask in <Picture 1>, a matte dark-green cylindrical 500 ml body with a narrowed shoulder, a brushed dark-gold screw cap, a plain unpatterned surface, and a small blank white label near the lower front.
<Subject 2> is the chief consort in <Picture 2>, a woman in her early forties with a broad square face, a low bun pinned with a kingfisher-feather ornament, a vermilion gold-woven court robe, and an old jade ring on her left ring finger; her gaze is heavy and she does not smile.
<Subject 3> is the new consort in <Picture 3>, a woman in her early twenties with an oval face, a high coiled bun with a single plain silver hairpin, a dark-teal satin high-collar dress, and a faint scar at the tail of her right eyebrow; her eyes stay lowered.
<Subject 6> is the inner hall in <Picture 4>, a new-Chinese palace inner hall with dark wooden lattice screens on frame right and a plain folding screen at frame left; fixed landmarks are the lattice door at right third, the bronze censer at bottom center, and the dark table at center.

summary:
[reference generation] A single-shot presentation beat in which the new consort offers <Subject 1> to the seated chief consort, preserving <Subject 1>, <Subject 2>, <Subject 3>, and <Subject 6> from their reference images.

retention_analysis:
<Subject 1> (appears in [Shot 1]): fully_preserved - the matte dark-green color, cylindrical shape, narrowed shoulder, dark-gold cap, blank white label position, and part count stay identical to <Picture 1> throughout the shot.
<Subject 2> (appears in [Shot 1]): fully_preserved - the square face, low bun with the kingfisher-feather ornament, vermilion gold-woven robe, and old jade ring stay identical to <Picture 2>.
<Subject 3> (appears in [Shot 1]): fully_preserved - the oval face, high coiled bun with the plain silver hairpin, dark-teal satin dress, and the scar at the tail of the right eyebrow stay identical to <Picture 3>.
<Subject 6> (appears in [Shot 1]): fully_preserved - the layout, the landmark positions, the materials, and the light baseline stay identical to <Picture 4>.

detailed_description:
cinematic new-Chinese palace period drama, realistic photographic look, soft side-backlight with warm candle fill, desaturated vermilion, dark-teal, and dark-gold palette, authentic silk and ceramic material response, the product color as the only saturated accent, shallow filmic depth of field, 9:16 vertical framing. At the start of the shot, the cold tea cup rests at the table edge and the chief consort's gaze is still lowered.
[Shot 1] A medium shot frames <Subject 6> with its lattice door at frame right and the dark table at center; the deep-red woven carpet runs toward the camera. <Subject 2> sits behind the table at frame right, her gaze lowered, her expression cold. <Subject 3> (S1) enters from frame left, stops three steps before the table, and raises <Subject 1> to chest height with both hands, the dark-gold cap facing the lens. Her sleeves sway with the movement as she speaks in a low, steady young female voice (S1): <d>[Chinese] 给我一炷香。</d> The camera tracks her hands with small amplitude at slow speed and settles on the flask at chest height; the chief consort does not look up. <Subject 1> remains fully visible, its matte dark-green body and dark-gold cap matching <Picture 1>; both women stay identical to their reference images.

overall_soundscape:
Low indoor room tone with a faint candle flicker. Soft fabric rustle and light footsteps cross the carpet, followed by the quiet creak of a wooden chair.

non_diegetic_music:
A single guzheng pluck at a slow tempo over a sustained low drone, with one soft struck-wood pulse as the camera settles.
```

**全片统一抗漂移设定（H3 无负向字段，全部写成正向锁定）**

- 商品：每条含商品镜的 `retention_analysis` 写 `fully_preserved`；`detailed_description` 再写一句 `keeps the exact shape, color, part count, and label position shown in <Picture N>`。
- 角色：每条逐字复制该角色英文锚点句；角色镜写"与角色卡一致"；画面内只出现本条列出的角色，背景保持空。
- 场景：同场景所有镜头逐字复用场景卡句与光位句；场景镜写"布局、地标位置、材质、光位基线与场景卡一致"。
- 编号：`<Subject N>` 全片沿用第四步顺序表（本例 1 商品、2–5 角色、6 场景，连续无空位）；`<Picture N>` 按每条附件从 1 起。
- 画面：只出现木、铜、瓷、织物等年代内器物与表中角色；皮肤保留自然纹理，双手五指完整；字幕、水印、品牌名全部留在后期字卡层；商品标签为空白白色块。
- 运镜：单镜一个主动作，低幅慢速；反转镜 `static shot` 停顿后再 `push in with small amplitude at slow speed`。
- 声音：台词不进 `overall_soundscape`；`non_diegetic_music` 只写器乐、速度、节奏与动态。

---

## 质检结果

| 项             | 结果                                                   |
| -------------- | ------------------------------------------------------ |
| 3 秒内冲突     | 通过（推盏 + 一句狠话）                                |
| 8 秒内商品出现 | 通过（第 7 秒）                                        |
| 商品改变剧情   | 通过（凉茶定罪 → 烫茶翻案）                            |
| 卖点数         | 3 个，各一镜                                           |
| 反转落点       | 落在"六小时后仍烫"这一可验证结果                       |
| 结尾四要素     | 商品名 / 利益点 / 行动指令 / 记忆点台词齐全            |
| 人物上限       | 4 人，无群演；每人有角色卡                             |
| 场景上限       | 1 个场景，1 张场景卡，地标全片不挪                     |
| 商品参考位     | 主图有图；无细节图，不占编号、不编造视角               |
| 素材参考表     | 6 行齐全（1 商品 + 4 角色 + 1 场景），连续编号、无空位 |
| 时长规则       | 10 镜 42 秒；短切 2 个（镜 2、镜 10），未超 3 个       |
| H3 结构        | 镜 1、镜 3 均为 Ref2VA 六段式；Subject 全局编号        |
| 台词格式       | 全部为 `<d>[Chinese]` 原文；说话人按本条发声顺序编号   |
| 负向字段       | 无；原负向意图已改写为正向锁定句                       |
