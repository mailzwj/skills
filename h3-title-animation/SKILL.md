---
name: h3-title-animation
description: "Generate spec-compliant MiniMax H3 video prompts for opening/title animations (片头动画): logo reveals, title cards, show intros, channel openers, and any short intro sequence that leads into main content. Use this skill whenever the user asks for a 片头, 片头动画, 开场动画, 标题动画, logo 动画, 节目包装, or an intro/opening H3 prompt — with text only (T2VA), first/last frame images (FL2VA/I2VA/L2VA), or reference images (Ref2VA) — even if MiniMax H3 is not named. Not for general non-intro video prompts; use h3-prompt-writing for those."
---

# H3 Title Animation Prompt Generator

Turn a brief for an opening/title animation into a spec-compliant MiniMax H3 prompt. An intro is a short, self-contained audiovisual statement (≤15 s) that sets identity and tone, then hands off to the main content — design every beat with that handoff in mind.

## Workflow

### 1. Collect the brief

Three inputs are required:

**Intro information.** Any of these counts: animation details, storyboard rules, a video style description, or the main-video content the intro belongs to. If the user provides main-video content instead of direct animation details, derive the visual language (subject, palette, mood) from it and state that derivation in the summary. If nothing is provided, or what is provided cannot pin down what the intro should show, ask one focused question covering: what the intro is for, what it should show, and whether there is a title/brand text to display. Do not generate before this is resolved.

**Duration.** Required, hard cap 15 s (H3 limit). If missing, ask — suggest 5–10 s, which suits most intros. If the user asks for more than 15 s, proceed with 15 s and say so in the summary.

**Style.** A valid style is present when the user's input contains an explicit style description (e.g., 电影感暖色调, cyberpunk, 极简), or when provided frame/reference images pin down the look, or when the described content carries concrete visual descriptors that fix a clear look (palette, texture, lighting). A bare subject or theme name (a food vlog, a tech channel, a game show) is NOT a style. If no valid video style can be extracted from the user's input, ask the user to pick one from this candidate list (present it in the user's language):

- 快闪
- 赛博朋克 (Cyberpunk)
- 故障艺术 (Glitch Art)
- 极简主义 (Minimalism)
- 蒸汽波 (Vaporwave)
- 动态图形 (Motion Graphics)
- 黑白高反差 (Noir/B&W)
- 蒙太奇 (Montage)
- 高饱和/波普风 (Pop Art)
- 一镜到底 (One-shot)

If other brief items are also missing, bundle the style question into the same turn. The confirmed style drives palette, motion and camera language, texture, and sound in step 3; if it conflicts with an explicit storyboard or frame anchor (e.g., 一镜到底 vs specified cuts), flag the conflict and ask which takes precedence.

### 2. Select the mode from the images provided (do not ask)

| Images provided | Mode | Prompt guide |
| --- | --- | --- |
| First + last frame | FL2VA | `references/base-en.txt` §3.2 |
| First frame only | I2VA | `references/base-en.txt` §3.1 |
| Last frame only | L2VA | `references/base-en.txt` §3.3 |
| Reference image(s) — character/scene/style/storyboard, not frame anchors | Ref2VA | `references/ref-en.txt` |
| Frame anchor(s) plus additional reference images | Ref2VA (`keyframe completion + reference generation`) | `references/ref-en.txt` |
| No images | T2VA | `references/base-en.txt` Case 1 |

A frame anchor is an image the user explicitly designates as the first or last frame of the video. If it is unclear whether an image is a frame anchor or a style/character reference, ask one brief question — this is the only case where mode selection may prompt the user.

### 3. Design the intro beats

Before writing, map the confirmed duration onto a beat structure:

- **Hook (first ~20%)** — an arresting opening state (motion, texture, sound) that promises the tone.
- **Build** — develop the subject and action; use the camera-motion vocabulary from the selected guide.
- **Reveal** — if the user provided title/brand text, it appears here: verbatim, in its original language, inside English double quotes, with typography (weight, color, treatment) and entrance motion described. Never invent title or brand text the user did not provide; when no text is supplied, design an abstract/graphic intro instead.
- **Handoff** — end on a frame that can cut into the main content: matching style, palette, and subject matter. When the brief references main-video content, state in the summary how the ending frame hands off to it.

Prefer one continuous shot for short intros — FL2VA in particular needs a single interpolable path between its two anchors; cut only when the user's storyboard explicitly specifies cuts. A confirmed style can itself authorize or forbid cutting: 快闪 and 蒙太奇 call for rapid cuts, while 一镜到底 mandates a single continuous take.

Audio: intros usually carry a strong `non_diegetic_music` that builds and lands on the reveal; `overall_soundscape` covers physical and ambient sounds (impacts, whooshes, room tone). Use `N/A` for `non_diegetic_music` only when there is no score.

### 4. Write the prompt to spec

Read the selected guide in full and follow its final structure exactly — field names, section order, labels, timing notation:

- Base modes (T2VA/I2VA/FL2VA/L2VA): `references/base-en.txt`. Frame-alignment instruction first when applicable, then `integrated_multimodal_description`, `overall_soundscape`, `non_diegetic_music` in that order.
- Ref2VA: `references/ref-en.txt` — six sections in order (`subject_definitions`, `summary`, `retention_analysis`, `detailed_description`, `overall_soundscape`, `non_diegetic_music`); reference labels stay consistent across all sections.

Hard rules (violations break H3 parsing or the user's expectations):

- Every cut time is strictly increasing and inside the confirmed duration; the state at the final second matches the requested ending, and for FL2VA lands exactly on Picture 2.
- Rewrite sections in English; dialogue, lyrics, and visible scene text stay verbatim in their original language.
- No plot summaries or meta commentary inside the prompt fields.

### 5. Return format

1. A short summary in the user's language: mode used, duration (mention any 15 s cap), beat/shot plan, key creative decisions (including how the ending hands off to the main content when applicable).
2. The final H3 prompt in a single fenced code block — exactly what gets pasted into MiniMax H3, nothing else inside it.

## Worked example (T2VA)

Brief: 8-second intro for a food-vlog show titled "食光记", live-action cinematic warm style, must hand off into the main footage.

```text
integrated_multimodal_description: [Shot 1] Live-action, cinematic, an extreme close-up of oil sizzling in a dark wok, steam curling upward against black. The camera pulls out with small amplitude at slow speed as the wok lifts and tilts, revealing hands plating a glossy noodle dish on a dark ceramic plate. [Shot 2] At 00:03.500, the shot cuts to a low-angle medium shot of the finished dish on a wooden table in warm side light; the title "食光记" fades in center-frame in bold white brush-stroke lettering with a soft glow, then scales up slightly and holds. The camera pushes in with small amplitude at slow speed toward the plate as the title settles, ending on a clean composition ready to transition into the main footage.

overall_soundscape: Hot oil crackles and sizzles, followed by the clatter of a ceramic plate on wood and a soft steam hiss.

non_diegetic_music: A percussive electronic groove at a fast tempo with sharp snare hits, building through the shot change and landing on a final hit as the title appears, then fading out.
```

User-facing summary for this output (in Chinese): 模式 T2VA，8s，两镜：油锅特写 → 成品+标题"食光记"定格收尾，结尾构图可直接接正片。
