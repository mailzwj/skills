# wushu_h3_v2 动作词库与用法参考

> 配套 `SKILL.md` 的动作侧参考：v2 动作 LoRA 的两种用法、训练集实证招式词、强度速查与避坑。
> 输出壳、镜头链、声画规则以 `SKILL.md` 为准；本文件只管动作词、三视图与强度标定。

## 1. 两种用法（本参考最重要的决策）

### 1.1 用法 A：要「纯动作参考」→ 用完整模板

按 `SKILL.md`「用法 A（仅三视图，不默认）」的模板原样写，产出干净的 mannequin 三视图动作演示。

**适用**：给三维 / 动画环节做动作参考；批量生成动作素材库。

### 1.2 用法 B：要「正常画面 + 武打动作」→ 保留触发词，改写场景与主体，并降强度

把模板里的「人体模型 / 三视图 / 纯黑虚空」替换为你要的主体与场景，但保留动作词与物理反馈词：

```
wushu_action, a martial artist in a dark training robe, 蹬地打直拳、转身换向, drives a straight punch, turns and shifts, 实时爆发力, explosive real-time force, 全身发力传导, force transmission through body, 无慢动作, no slow motion, 无停顿, no pause, indoor training hall, medium shot, stable camera
```

要点：

1. **主动写出主体和场景**——不写，模型就按训练分布的「人体模型 + 黑底」补全。
2. **保留物理反馈词组** `实时爆发力 / 全身发力传导 / 无慢动作 / 无停顿`——它们参与塑造动作质量。
3. **LoRA 强度先降到 0.6–0.8**——压制画风上的人体模型倾向，同时保住动作。
4. 若仍偶发黑底 / 白模，再降到 0.5，或叠加一个画风 LoRA 对冲。

> 用法 B 尚未实测（训练机无 ComfyUI）。先做小批量测试标定强度：第一轮测 0.6 / 0.8 / 1.0 三档。

## 2. 招式词库（训练集实证）

以下是训练集 caption 里真实出现过的招式词，括号内为出现次数；多词成套使用的类别不单独计数。用这些词的命中率远高于自造词。频次口径与 `SKILL.md` §6.2 一致。

| 类别 | 招式词（次数） |
| --- | --- |
| 拳法 | `蹬地打直拳`（37）｜`后手横拳`（6）｜`上勾拳`（5）｜`抡臂横勾`（4） |
| 腿法 | `高侧踢`（24）｜`提膝撞击`（8） |
| 移动 / 步法 | `稳步前进`（108）｜`疾步冲刺`（79）｜`转身换向`（7）｜`下蹲低姿`（4）｜`急速冲刺`（`疾步冲刺` 的拼写变体） |
| 受击 / 失衡 | `踉跄后退`（69）｜`失衡踉跄`（7）｜`反弓跌落`（4）｜`团身翻滚`（4） |
| 刀剑 | `突刺贯穿`（50）｜`横斩劈砍`（35）｜`双持交叉斩`（10）｜`横扫`（7） |
| 棍棒 | `转棍扫击`（10） |
| 远程 / 弩 | `举弩瞄准` ｜ `脚踏上弦装填` ｜ `松手放箭`（三词成套使用） |
| 防御 | `举盾格挡`（54）｜`侧闪回避`（24）｜`侧身格挡反击`（3） |
| 摔投 | `过肩摔投`（7）｜`锁颌下坠`（3） |
| 空中 | `腾空跃起`（67） |
| 节奏 / 待机 | `呼吸站姿微动`（41） |
| 组合 / 通用 | `连续连招`（239，最高频）｜`战斗动作`（232，泛化占位词，勿用，换具体招式） |

多招式串联用「、」连接（训练集原样写法）：

```
蹬地打直拳、转身换向
突刺贯穿、疾步冲刺
举盾格挡、侧身格挡反击、转棍扫击
后手横拳、举弩瞄准、脚踏上弦装填、松手放箭
```

## 3. 成品示例

**示例 1｜复现训练分布（用法 A）**

```
wushu_action, 白色无贴图男性人体模型, white untextured male mannequin, 同一角色三视图同步并排 (左+正+右), three orthographic views of the same character side by side, 纯黑虚空, pure black void, 固定全身机位, fixed full-body cameras, 动作完全同步, identical synchronized motion, 不是三个战士, not three fighters., 连续连招, chains a combo sequence, 实时爆发力, explosive real-time force, 全身发力传导, force transmission through whole body, 无慢动作, no slow motion, 无停顿, no pause.
```

> LoRA 强度 0.9–1.0

**示例 2｜借动作做正常画面（用法 B，单人拳法）**

```
wushu_action, a martial artist in a grey training uniform, 蹬地打直拳、上勾拳, drives a straight punch then an uppercut, 实时爆发力, explosive real-time force, 全身发力传导, force transmission through body, 无慢动作, no slow motion, 无停顿, no pause, indoor dojo with wooden floor, medium shot, stable camera
```

> LoRA 强度 0.7

**示例 3｜借动作做对打（用法 B，双人）**

```
wushu_action, two fighters in plain training gear, 举盾格挡、侧身格挡反击, raises a shield to block then counters from the side, 实时爆发力, explosive real-time force, 全身发力传导, force transmission through body, 无慢动作, no slow motion, 无停顿, no pause, outdoor stone courtyard, full-body shot, stable camera
```

> LoRA 强度 0.7。注意本 LoRA 训练集是**单人**三视图，双人属外推，需实测。

**示例 4｜兵器（突刺）**

```
wushu_action, a spearman in dark robes, 突刺贯穿、疾步冲刺, thrusts the spear forward and dashes in, 实时爆发力, explosive real-time force, 全身发力传导, force transmission through body, 无慢动作, no slow motion, 无停顿, no pause, bamboo grove at dusk, medium tracking shot
```

> LoRA 强度 0.8

## 4. 负面提示词

训练时负向为空，模型没学负向，只加画质类：

```
blurry, distorted, low quality, jittery motion, extra limbs, deformed hands, morphing bodies, inconsistent lighting, flickering, static pose, frozen motion
```

## 5. 参数与强度速查

| 场景 | LoRA 强度 | 说明 |
| --- | --- | --- |
| 复现三视图动作参考 | **0.9 – 1.0** | 训练分布内，拉满最准 |
| 正常画面借动作（推荐起点） | **0.7** | 动作与画风的平衡点 |
| 画风干扰太强 | 0.5 – 0.6 | 保动作、压画风 |
| 动作不够「武」 | 1.0 – 1.1 | 超过 1.1 易崩 |

> 上表是基于训练集构成的合理起点，不是实测最优值；先做小批量测试标定。

## 6. 已知限制与避坑

| 序号 | 问题 | 原因 | 对策 |
| --- | --- | --- | --- |
| 1 | 输出总是白色人体模型 + 黑底 + 三视图 | 训练集 100% 如此 | 见 §1.2 用法 B；主动写主体 / 场景 + 降强度 |
| 2 | 画面「像三个战士」 | H3 把并排三视图误判为三人 | 模板里保留 `不是三个战士, not three fighters.` |
| 3 | 出慢动作 / 停顿 | 训练集专门标注了「无慢动作 / 无停顿」 | 提示词里**务必保留**这两个词组 |
| 4 | 生成较长片段时崩坏 | 训练分布仅 39–90 帧 @30fps（1.3–3.0 秒） | 优先生成短片段；长片靠分段 + 剪辑拼接 |
| 5 | 超宽画幅才最稳 | 训练分辨率 960×360（≈2.67:1） | 想最稳可试接近该比例；16:9 属外推 |
| 6 | 双人对打不稳 | 训练集全为**单人** | 双人属外推，需实测；可配合 v7 或多参 Ref2VA |
| 7 | 人脸 / 服装质感差 | 训练素材**无贴图**，不含皮肤纹理信息 | 这是动作 LoRA，质感交给画风 LoRA / 参考图 |
| 8 | 招式不具体 | 用了 `战斗动作` 这类泛化词 | 换 §2 的具体招式词 |

## 7. 组合用法

| 目标 | 方案 |
| --- | --- |
| 动作准 + 成片好看 | **v2（动作，0.6–0.7）+ v7（画风 / 术语，0.7–0.9）** 叠加 |
| 锁人物 + 借动作 | v2 + 多参 Ref2VA（人物卡 + 场景图），动作靠 v2 触发 |
| 物理反馈更真 | 叠加 spatial-physics LoRA（打斗辅助场景 0.3–0.5） |
| 高动态模糊 / 崩脸 | 双采样（低分出结构 → 高分细化）；仍崩再降 v2 强度 |
