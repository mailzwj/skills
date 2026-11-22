---
name: chinese-3d-animation-spec
description: |
  Turn a story idea into a complete set of generation prompts (a spec) for a Chinese-style cinematic photoreal CG animated short — without generating the images or videos directly. Every artifact is locked to a guofeng / xianxia high-end CG look: near-photoreal rendering, desaturated moon-white and frost-blue palette, volumetric mist, translucent silk backlight, strand-level hair, ink-wash landscapes, filmic shallow depth of field, and restrained realistic performance. Produces a project brief, story outline, character-card image prompts (Qwen-Image by default), environment-only scene-card image prompts, a 3–5 second opening title segment at the head of shot 1 that may use approved characters or scenes as thematic background (exact title and author credit, splash-ink brush or blade-edge display typography chosen at random when the user gives no font preference, resolving into the story action inside the same shot), a six-column standardized shot table whose first row is S01 and opens with that segment, text storyboards, and single-shot video prompts (h3-prompt-writing by default; when H3 is selected, Ref2VA is the default and approved character/scene cards serve as global reference material). Use when the user wants the prompt/spec layer of a narrative animation workflow with strong character consistency, scene continuity, timing, camera, performance, audio, and a fixed Chinese CG art direction, ready to hand off to image and video generation tools. Not for actually generating images or videos, simple edits, photorealistic live action, or one standalone prompt.

---

# Chinese 3D Animation Shot Spec

Use this Skill when the user wants the complete prompt/spec layer of a story-first Chinese-style animated short — from a one-line idea to a set of generation prompts ready to hand off to image and video tools. This Skill does not generate images or videos; it produces the prompts and specs that drive those tools. The workflow must place every major artifact on the canvas in production order and pause at creative gates with user choice cards before high-impact steps.

Core rule: **story first; gather the exact title and exact author credit and ask for any missing required input instead of inventing it; ask screen size and total duration with choice cards immediately after user intake; ordered canvas artifacts; every required confirmation via choice card; fixed order after character/scene card prompts: 3–5 second opening title segment at the head of shot 1, merged into S01 rather than made a separate shot (title + author, optional thematic character/scene background, font style randomized when unspecified, resolving into S01's story action in the same continuous shot) → six-column standardized shot table whose first row is S01, with the title segment as its opening sub-section, followed by per-second directives + audio cues + spatial anchor chain → shot-table self-check gate → one single text storyboards document with one section per shot starting with S01 and the title segment as the first block inside S01 (multi-panel pencil image only when user explicitly opts into visualization mode; any shot flagged for heavy iteration is extracted to a standalone text storyboard node) → video-model choice card (H3 default, Seedance 2.0 fallback) + resolution choice card → single-shot video generation prompts written per shot, S01 first (prefer the `h3-prompt-writing` skill; when H3 is selected, default to Ref2VA with approved character/scene cards as a global reference library). Every character card, scene card, opening title segment, storyboard and video prompt carries the Global Visual Style Lock. This Skill outputs prompts and specs only; it never generates images or videos or assembles a final film**.

## Global Visual Style Lock

Unless the user explicitly requests another visual style, all character card prompts, scene card prompts, shot tables, text storyboards, optional pencil storyboards, and single-shot video prompts (regardless of which video model they target) must use this visual style. The lock constrains **how things are rendered**, not **who is in the film** — character gender, age, face, hair color/style, costume design, accessories, role, and world setting come from the story; never port a reference character into the prompts.

- Rendering pipeline: film-grade Chinese-style photoreal CG — next-gen game-cinematic / animated-feature quality, path-traced global illumination, physically plausible materials, cinematic color grading, a clean luminous image with subtle film grain. Not cartoon rendering, not flat 2D anime.
- Character realism: idealized realism with near-real human proportions and East Asian facial structure; solid facial anatomy, refined restrained features, quiet expression. No Q-version big heads, no geometric simplification, no exaggerated deformation.
- Skin: fine porcelain, low-saturation complexion; subsurface scattering brings faint red through ears, nose tip, and fingertips; keep pore- and vellus-level micro detail and soft specular roll-off; no plastic sheen, no over-smoothed skin.
- Hair: strand-level rendering, high density, real weight and satin sheen; hair glows at the edges under rim / back light, with fine flyaway strands and naturally tapering tips. No blocky cartoon hair cards.
- Material language: layered translucent gauze, crepe, and silk with thin luminous edges; embroidery, pearls, jade, and silver carry true micro-highlights and delicate reflections; fabric has real weight, drape, and wind response.
- Color: desaturated Eastern palette — moon white, frost blue, misty grey-blue, lotus pink, pale gold, ink green; large negative space. No high-saturation candy colors, no fluorescent or neon.
- Lighting: high, soft key + translucent fabric backlight + hair rim light; volumetric haze, gentle bloom, soft focus; high-key low-contrast, shadows stay lucid and never crush to black; dust motes and particles visible in the light.
- Atmosphere and set: ink-wash mountain silhouettes, thin mist, still-water ripples, drifting petals / snow crystals / light motes; strong aerial perspective, distance dissolving into ink-toned layers.
- Camera: filmic shallow depth of field (85mm / 135mm portrait-lens feel); steady or very slow moves (slow push, slow pan, orbiting track, crane), negative-space and symmetrical / thirds-balanced minimalist Eastern composition, a calm frame.
- Performance: realistic, restrained, inward; emotion carried by eye-line, breath, micro-expression, weight shift, and the secondary motion of cloth and hair; motion has real weight, inertia, follow-through, and settle; no elastic exaggeration.
- Negative style constraints: no Pixar / Disney cartoon, no Q-version, no plastic toy skin, no flat 2D anime, no high-saturation candy palette, no cyberpunk neon, no game UI / HUD, no Western-fantasy styling, no grubby live-action documentary feel, no stiff mannequin posing, no lifeless expression.

Default world flavor is ancient Chinese xianxia / guofeng. If the story is set elsewhere, keep the rendering, color, lighting, performance, and camera locks, and adapt costume and environment to the story.

Style lock token string — append verbatim to every image and video prompt:

- English: `cinematic Chinese guofeng photoreal CG, next-gen game cinematic quality, desaturated moon-white and frost-blue palette, soft volumetric lighting, translucent silk backlight, strand-level hair detail, ink-wash mountain haze, shallow filmic depth of field, minimalist oriental negative-space composition, high-key low contrast, subtle film grain`
- Chinese: `国风仙侠影视级写实CG，次世代过场动画质感，低饱和月白霜青色系，柔和体积光，纱衣透射逆光，发丝级细节，水墨远山薄霭，电影级浅景深，东方极简留白构图，高调低对比，轻微胶片颗粒`

## Opening Title Segment (Mandatory, at the Head of S01)

Every delivery presents the opening title inside the first shot, not as a separate shot: S01 begins with a 3–5 second title segment that shows the exact film title and author credit, may use approved characters or scenes as thematic background, and resolves into S01's story action in the same continuous shot.

- Exact on-screen text: the title and author credit are rendered verbatim. If the user has not supplied them, ask and wait. Never invent, translate, abbreviate, transcribe loosely, or reformat them; preserve the user's credit format (e.g. `作者：`, `A film by`, a pen name) exactly.
- Thematic background (optional): the title segment may reference approved material as its theme background — at most one scene card and up to two character cards. When used, record the exact card names so identity and environment stay locked. The reference must stay thematic: a still environment, a calm portrait, a back-view or silhouette figure, or a defocused presence. No plot action, no interaction, no dialogue, no story event, no plot preview, and no story props beyond what the bound cards already contain. Referenced characters do not perform; they inhabit the frame. Keep the background subordinate to the typography (defocus, soft contrast, negative space) and keep faces out of the title's text block. If no cards are referenced, use only the Global Visual Style Lock (ink, mist, silk, light, particles, landscape silhouettes).
- Typography: if the user specified a font style, use it. Otherwise randomly choose exactly one of: (a) **splash-ink bold brush handwriting** — wet ink bleed, dynamic sweeping brush strokes, high contrast on paper texture; (b) **sharp blade-edge art lettering** — angular pointed terminals, blade-like strokes, crisp hard edges. Record the chosen style in the Project Brief and the S01 storyboard; keep it stable across retries and change it only if the user asks. Never mix the two, never skip the choice.
- Typography layout: title dominant, author credit secondary; color, scale, and placement must harmonize with the frame; both must stay readable for the full 3–5 second segment.
- Duration: 3–5 seconds at the start of S01 (from `0s` to `3–5s`), default 5 seconds, confirmed with the opening duration card.
- Integrated handoff (mandatory): name the transition from the title segment into S01's story action (ink-dissolve, mist-wipe, light-flare match, title dissolve, or continuous push-through) and design the segment's last frame so its composition, lighting baseline, particle state, and camera motion resolve into the story action's first frame. No cut and no unexplained hard cut; the story action begins after the segment inside the same shot.
- S01 duration: S01's planned duration must cover the title segment plus its story beat. The title never replaces or truncates the story beat. If the segment would push S01 over 15 seconds, shorten the segment within 3–5 seconds or move the story beat to another shot — never split the title into its own shot.
- Deliverables: no separate `片头分镜` node, no separate opening shot, and no separate opening video prompt. The title segment design lives in the Project Brief and in the S01 row, storyboard section, and video prompt. If an opening keyframe image is produced, it is the S01 opening-frame image prompt (Qwen-Image by default, approved aspect ratio + style lock + exact text + chosen font style + any bound thematic scene/character cards + negative: no plot action in the title segment, no extra text, no watermark, no characters beyond the bound cards), not a separate opening shot.

Opening title segment minimum fields:

- Segment title & timing: `S01 opening title segment / 0–<3–5>s — <title>`
- Typography: exact title / exact author credit / font style (user-specified or the randomized pick) / hierarchy / placement / entrance and exit animation
- Visual: background concept (may be a referenced scene card), atmosphere layers, palette, light, one continuous camera move
- Thematic reference (optional): scene card name and character card names, with how each is used (environment still / calm portrait / silhouette / defocused presence) and how it fits the title theme
- Per-second directives: each second of the segment covers text entrance or hold, background motion, camera, audio, and the internal handoff
- Handoff: named transition into S01's story action plus matched first-frame state (composition, light, motion)
- Binding: `characters: none | <exact card names>`, `scene card: none | <exact card name>`
- Marker: `[TITLE-SEGMENT]` inside S01; S01's Hook Type remains its story hook, and S01 must also carry the title reveal

## STEP 0: Intake and Canvas Plan

Capture:

- One-line idea or rough premise
- Desired output: always the opening title segment inside S01, plus blueprint only, character-card image prompts, scene-card image prompts, standardized shot table with per-second directives, single text storyboards document (default) + extracted single-shot text storyboard nodes for heavy-iteration shots + multi-panel pencil storyboards (opt-in), or single-shot video prompts (with the target video model chosen in Step 7). This Skill outputs prompts and specs, never final images or videos.
- Approximate length, if the user already stated it
- Screen size / aspect ratio, if the user already stated it
- Visual tone: default Chinese xianxia photoreal CG (moon-white / frost-blue cool palette) per the Global Visual Style Lock
- Dialogue requirement: whether the film has dialogue, voiceover, or no speech
- Dialogue language only if the user explicitly states it; do not default to English dialogue
- Exact on-screen title, verbatim
- Exact author credit, including any prefix or formatting the user wants displayed
- Opening title segment duration, if the user already stated it (constrain to 3–5s)
- Style reference images, if the user supplies any: extract rendering, palette, lighting, and mood only; never copy the people, hairstyles, costumes, or props in them

Missing-information rule: if any required item is missing — story premise, exact title, exact author credit, screen size / aspect ratio, total duration, or dialogue mode — ask the user and wait. Do not invent, infer, or silently default. The one exception is font style, which is randomized when unspecified per the Opening Title Segment rules.

Immediately after capturing the user's input, before Project Brief or any other next step, show choice cards to confirm production format:

Screen size / aspect ratio card:

- 16:9 landscape (recommended for cinematic short)
- 9:16 vertical short
- 1:1 square
- 4:5 social portrait
- Custom size / aspect ratio

Total duration card:

- 30–60 seconds (recommended)
- 15–30 seconds
- 60–90 seconds
- 90–180 seconds
- Custom duration

Opening title segment duration card:

- 3 seconds
- 4 seconds
- 5 seconds (recommended)
- Custom duration (must stay within 3–5 seconds)

Only proceed after the user chooses screen size/aspect ratio and total duration, or explicitly supplies custom values; confirm the opening title segment duration in the same pass (3–5 seconds, default 5, if the user does not specify). Store all three in the Project Brief and reuse them in shot timing, transition continuity, the standardized shot table with per-second directives, single-shot storyboards (text by default, pencil image when user opts in), and single-shot video prompts.

Create or later update canvas artifacts in this order:

1. Project Brief text node
2. Story Outline text node
3. Character Card image-prompt text nodes
4. Environment-only Scene Card image-prompt text nodes
5. **Opening Title Segment inside S01** — designed within the first shot rather than as a separate artifact: the exact title and author credit occupy the first 3–5 seconds of S01, optionally using approved characters/scenes as thematic background, and resolve into S01's story action with a named internal transition
6. Standardized Shot Information Table node with six columns; its first row is S01 and begins with the opening title segment, then continues into the story directives inside `Shot Description`
7. **Single text storyboards document** — one canvas text node named `<title> text storyboards` containing one section per story shot starting with S01; the S01 section opens with the title-segment block (mirrors the half-narrated-drama storyboard structure). When the user flags a shot for heavy iteration, that section is extracted to a standalone text node and a `(extracted)` marker is left in the document. Pencil image storyboards, if opted in, are separate image nodes.
8. **H3 global reference manifest** — only when H3 is selected: a canvas text node named `全局参考素材清单` / `global-reference-manifest`, mapping every approved character and scene card to a stable `<Subject N>` ID, its exact card name, its card image (or `pending`), and the shot IDs where it is used
9. Single-Shot Video Prompt text nodes, S01 first (written for the target video model selected in Step 7 — H3 default, Seedance 2.0 fallback; H3 prompts are Ref2VA and bind the manifest cards)

Do not dump long production content only in chat. Put durable outputs on canvas as text nodes.

## STEP 1: Project Brief

Produce a concise project brief and write it to a canvas text node named with the project title or `项目简报`.

Include:

- Working title
- Exact on-screen title (verbatim)
- Exact author credit and credit format (verbatim)
- Opening title card plan: duration, font style (user-specified or the randomized pick), and the S01 handoff
- One-line What-if
- Emotional premise
- Target audience feeling
- Main deliverables planned
- Approved screen size / aspect ratio
- Approved total duration
- Approved visual style (default: Chinese xianxia photoreal CG per the Global Visual Style Lock)
- Dialogue mode and language: only use a specific language when the user explicitly requested it; otherwise write `language not specified` and keep dialogue minimal or ask later when needed
- Initial risks
- Dialogue intent when present

Then show a user choice card:

- Continue with this direction (recommended)
- Regenerate premise options
- Revise emotional premise
- Refine dialogue direction

Only proceed after the user chooses or explicitly says to continue.

## STEP 2: Story Outline and Gates

Create a story outline and write it to a canvas text node named `故事大纲` or `story-outline`.

Include:

- Protagonist Want / Need / flaw
- Core world rule
- 8-beat causal story spine
- Emotional anchor and payoff
- Dialogue beats if the user requested dialogue
- Red-line checks

Gate checks:

- Protagonist is active
- Crisis is intensified by protagonist flaw
- Coincidence never solves the problem
- Ending reuses an earlier emotional anchor
- Antagonistic pressure is not a flat villain
- Dialogue reveals relationship change instead of explaining the theme

Then show a user choice card:

- Approve story and continue (recommended)
- Revise beats
- Revise emotion curve
- Revise dialogue beats
- Return to premise

## STEP 3: Character Card Image Prompts

Write character card image-generation prompts and place each prompt as a text node on canvas. Recommended order:

1. Protagonist card prompt
2. Contrast / pressure character card prompt
3. Optional supporting character card prompt

Each character card prompt, when fed to an image generation model, must produce a 16:9 production reference sheet. The prompt must instruct the model to include clear readable labels so downstream generation can bind the correct person and props:

- Character name label in English and/or the project language
- Role label, such as protagonist, elder, antagonist, sidekick, pressure character
- Main 3/4 view
- Front / side / back views
- Expressions
- Material / costume / prop details
- Important prop labels, such as sword, lantern, fan, jade pendant, hairpin, scroll, shoes, veil
- Identity lock repeated in the prompt
- A short visual-ID note listing age range, body type, hairstyle, outfit colors, signature props, and do-not-change traits

For this cinematic CG style, instruct the model to keep the character's face, proportions, materials, and styling consistent and photoreal-CG credible across later images and videos. Do not import a template face, hairstyle, or costume from any reference sheet; the character design comes from the story.

Image model default: if the user has not specified an image generation model, write the prompt for **Qwen-Image**. Compose the prompt so it is a self-contained Qwen-Image generation prompt that reproduces the character card above, including the global visual style lock, style lock token string, all labels, views, material/prop details, identity lock, and visual-ID note. If the user names a different image model, write the prompt for that model instead.

After the main character card prompts are written, show a user choice card:

- Lock character designs and continue (recommended)
- Regenerate protagonist card prompt
- Adjust specific visual details
- Add another character card prompt

Warn the user that changing locked character designs later may require regenerating the shot table, single-shot storyboards, and single-shot video prompts.

## STEP 4: Scene Card Image Prompts

Write scene card image-generation prompts and place them as text nodes on canvas after the character card prompts. The scene card prompts must describe environments only: do not include characters, people, crowd figures, silhouettes, hands, faces, or character cameos. Character action belongs in the shot table, single-shot multi-panel pencil storyboards, and single-shot video prompts, not scene card prompts.

Include in each prompt:

- Main environment overview
- Key light states, such as dawn / dusk / moonlit night
- Emotional sub-spaces
- Continuity landmarks (fixed objects whose screen position must persist across shots in the same scene, e.g. stone bridge, pavilion pillar, screen wall, old tree, altar)
- Important props in the environment
- Atmosphere layer details consistent with the style lock (mist, water ripples, drifting petals, light motes)

Image model default: as in STEP 3, if the user has not specified an image generation model, write the prompt for **Qwen-Image**, as a self-contained prompt that reproduces the scene card above while including the global visual style lock and style lock token string. If the user named a different model, write for that model instead.

Then show a user choice card:

- Lock scene design and continue (recommended)
- Regenerate scene card prompt
- Add another scene angle
- Adjust lighting or layout

## STEP 4.5: Opening Title Segment Design (Merged into S01)

Design the mandatory opening title segment before the shot table, but do not create a separate shot, node, or prompt for it. The segment is the first 3–5 seconds of S01; S01's story action follows in the same continuous shot.

Required reference: read and follow the "Opening Title Segment" section above for the exact-text, font-randomization, layout, duration, and integrated-handoff rules.

Minimum runtime contract:

- Create no `片头分镜 S00` node and no separate opening keyframe. Record the segment design in the Project Brief.
- Use the exact approved title and author credit from the Project Brief; if the user has not supplied them, stop and ask.
- If the user specified a font style, use it; otherwise pick exactly one at random — splash-ink bold brush handwriting or sharp blade-edge art lettering — and record the pick in the Project Brief.
- Bind at most one scene card and up to two character cards, and only as thematic background; record their exact names, or `none` when no cards are referenced. Referenced characters stay static or near-static (calm portrait, back view, silhouette, defocused presence) and never perform a plot action.
- Fix the segment at 3–5 seconds (approved opening duration), starting at S01's `0s`.
- Name the internal transition from the title segment into S01's story action, and state how the last frame of the segment (composition, lighting baseline, particle state, camera motion) resolves into the story action's first frame.
- Confirm S01's planned duration covers the segment plus its story beat; if that exceeds 15 seconds, shorten the segment within 3–5 seconds or move the story beat — never split the title into its own shot.
- An optional S01 opening-frame image prompt, if produced, is S01's first frame (title segment frame), not a separate opening shot.

Then show a user choice card:

- Approve title segment design and continue to shot table (recommended)
- Adjust thematic background (choose scene/character cards or none)
- Switch to the other font style
- Revise title or author credit (user supplies exact text)
- Adjust title segment duration (within 3–5s)
- Adjust the internal transition into S01's story action

## STEP 5: Standardized Shot Table Video Prompts (Six Columns)

After character card prompts, scene card prompts, and the title-segment design are locked, output standardized video prompts as a shot information table. This step is mandatory and cannot be swapped with storyboard or video-prompt generation.

Required reference: read and follow `references/shot-table-spec.md` for the exact six-column schema, per-second directive requirements, table-wide rules, user approval card, and mandatory Step 5.5 self-check gate.

Minimum runtime contract:

- Create a canvas table node named `标准镜头信息表` or `standard-shot-table`.
- Use exactly six columns: `Shot ID & Duration`, `Continuity Handoff`, `Reference Anchors (Spatial + Identity)`, `Hook Type`, `Shot Description (Per-Second Directives)`, `Audio & Dialogue Track`.
- The first row is S01. Its `Shot Description` must open with the `Opening Title Segment (0–3/5s)` block from Step 4.5 — exact title and author credit, typography entry/hold, optional thematic scene/character background, and the internal transition into the story action — then continue directly into S01's story per-second directives with no time gap. S01's `Hook Type` is its story hook, not `title-card`; S01 must carry both the title reveal and the shot's story hook.
- S01's identity bindings are `characters: none | <exact character card names>` and `scene card: none | <exact scene card name>`; title-segment thematic references are recorded separately from S01's story-action on-screen characters.
- Every row must include complete per-second directives, continuity handoff, reference anchors, hook type, and audio/dialogue timing.
- Every row must stage performance as realistic, restrained, and weighty — eye-line, breath, micro-expression, weight shift, cloth and hair secondary motion — not elastic cartoon acting.
- Run the Step 5.5 self-check from `references/shot-table-spec.md` before storyboarding. Do not enter Step 6 until the self-check passes.

Then show the table approval/self-check choice cards defined in `references/shot-table-spec.md`.

## STEP 6: Text Storyboards Document (Default) + Pencil Image Storyboards (Opt-in)

After the Step 5.5 self-check passes, show a storyboard-mode choice card before producing any storyboard artifact.

Required reference: read and follow `references/storyboard-guidelines.md` for the default single text storyboards document, optional multi-panel pencil storyboards, shot-level extraction/re-integration, storyboard approval cards, and visualization fallback rules.

Minimum runtime contract:

- Default mode is one authoritative text storyboards document containing one section per shot.
- The document opens with S01. The S01 section begins with the mandatory opening title segment block — typography, optional thematic scene/character references (or `none`), per-second title-segment directives, and the internal transition into S01's story action — then continues into S01's story per-panel content. There is no S00 section.
- Pencil storyboard images are opt-in visualization artifacts only; they never override the text storyboard.
- Extract a shot into a standalone text node only when the user flags that shot for heavy iteration.
- Step 7 must read the matching text storyboard section or extracted standalone node, not the pencil image.

After all storyboards are approved, proceed to the video-model choice card.

## STEP 7: Video-Model Choice Card + Single-Shot Video Prompts

Before any video prompt is written, show the video-model choice card and resolution choice card. The video model chosen here determines the prompt format for every shot.

Required reference: read `references/model-selection.md` for the H3 default, Seedance 2.0 fallback, per-shot mixed mode, resolution choices, and model-specific prompt shaping.

Minimum runtime contract:

- H3 is the recommended default target model.
- **H3 Ref2VA default**: when H3 is selected, including H3 rows in per-shot mixed mode, write Ref2VA prompts and treat the approved character and scene cards as a global reference library. Build the `global-reference-manifest` first; assign each card a stable `<Subject N>` ID and never renumber it across shots.
- Each H3 shot prompt uses the six Ref2VA sections in order (`subject_definitions`, `summary`, `retention_analysis`, `detailed_description`, `overall_soundscape`, `non_diegetic_music`), attaches all on-screen character cards plus the shot's scene card, and defines each subject by citing its card image. Identity, costume, and environment come from the cards, not from prose.
- S01 carries the opening title segment. When S01 references thematic cards, write it as Ref2VA with those cards; if it references none, keep Ref2VA if any story-action cards are attached, otherwise use T2VA. If card images are not generated yet, keep Ref2VA and mark them `pending` in the manifest — do not silently downgrade to T2VA.
- Seedance 2.0 is the fallback target for high-stakes realistic action and complex choreography.
- Per-shot mixed mode is allowed only when the shot table marks the model per row; unmarked rows default to H3. Only H3 rows use the Ref2VA contract.
- For each approved table row, write a single-shot video generation prompt by reading the matching text storyboard section (or extracted standalone node), exact character card names, and exact scene card name. Write S01 first from its title-segment block and story section, using the approved title/author strings. For H3, read the global reference manifest and bind the card images instead of re-describing identity or environment from prose.
- For S01, reproduce the title and author credit exactly inside the first 3–5 seconds, keep the typography stable and legible for the full segment, add no extra text, and resolve into S01's story action through the named internal transition. Keep any title-segment thematic characters/scenes non-performing during the segment. When exact on-screen text is the deliverable, prefer H3 for S01 even in per-shot mixed mode; if action staging forces S01 onto Seedance, keep the title segment in S01 and flag the text-rendering risk rather than splitting the title into a separate shot.
- Prompt format: prefer generating the prompt with the `h3-prompt-writing` skill. For H3, invoke it in full-reference mode and follow its Ref2VA guide; if that skill is not available, ask the user whether to install it, or fall back to the six-section Ref2VA rules in `references/model-selection.md`.
- Strip all storyboard-only double-binding labels (`[char:…]`, `[scene:…]`, `[shot:…]`, `[dur:…]`, `[hook:…]`) from the prompt content.
- Append the style lock token string to every video prompt.

Write the resulting video prompts to canvas text nodes in shot order, S01 first, group them as `<title> shot video prompts`, keep the H3 manifest alongside the group, and show the prompt approval card defined in `references/model-selection.md`.

## Boundaries

This Skill produces prompts and specs only; it does not generate images, videos, or a final assembled film. Do not use it for a single image, a simple edit, a single clip animation, logo design, or a single standalone prompt. If the user wants to actually render the images or videos, hand the produced prompts to the appropriate image or video generation tool/skill.
