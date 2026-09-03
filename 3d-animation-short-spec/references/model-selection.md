# Video Model Selection and Prompt Shaping

## STEP 7: Video-Model Choice Card + Single-Shot Video Prompts

### Video-model choice card (mandatory before any video prompt is written)

Before any video prompt is written, show the video-model choice card. The choice determines the prompt format for every shot and is stored in the Project Brief, reused for every shot in this project unless the user later changes it.

Video model card:

- **H3 (recommended default)** — strong on visual packaging, motion graphics, text/UI clarity, multi-modal context understanding, and cost efficiency. Native dual-channel audio. Best for: stylized 3D animated shorts with strong design language, text overlays, motion-graphic moments, packaging-style transitions, and dialogue-driven beats where the audio is part of the deliverable. This model's prompts are written with the `h3-prompt-writing` skill.
- **Seedance 2.0 (fallback for high-stakes animation performance)** — strong on cinematic camera, complex shots, elastic Pixar-style performance, and tension-driven action. Best for: chase sequences, slapstick beats, climax shots where the selling point is the animation itself rather than the packaging.
- **Per-shot mixed (advanced)** — let the user mark `video_model: H3` or `video_model: Seedance2` in the `Shot Description` column of individual rows. Use this when the project has both packaging-heavy and performance-heavy shots. The default for unmarked rows is H3.

### Resolution choice card (after video model)

Once the video model is locked, show the resolution choice card so the resolution can be recorded into the prompt spec:

- 768P (recommended for H3 first pass; cost-efficient)
- 2K (H3 default quality; higher cost, sharper final render)
- 1080p (recommended for Seedance 2.0)
- 720p (Seedance 2.0 draft; lowest cost)
- Match project / custom resolution

The user must confirm a resolution before the first video prompt is written. Resolution can be changed per shot later if the user wants a hero shot at higher detail.

### Single-shot video prompt generation

For each approved table row, write a single-shot video generation prompt. Each prompt must be written from the matching section of the text storyboards document (extracted standalone node if that section was extracted, otherwise the in-document section), the character card name(s), and the scene card name from that row.

Per-shot rules common to all target models:

- Use the text storyboards document as the authoritative per-shot reference for narrative, composition, camera movement, action staging, per-second timing, and shot number. For shots that have been extracted to a standalone node, read the extracted node instead. If a pencil image storyboard also exists, use it only for human-side pose / silhouette pre-check; do not let it override the text storyboard.
- Use character card names as the authoritative identity source.
- Use scene card names as the authoritative environment source.
- **Strip all storyboard double-binding labels** (`[char:…]`, `[scene:…]`, `[shot:…]`, `[dur:…]`, `[hook:…]`) from the prompt content — these labels are storyboard-only reference markers and must NOT appear in the final video prompt. Pencil image storyboards additionally have their own shot numbers, camera icons, arrows, and notes that must not be carried into the prompt.
- The prompt must describe clean full-color Pixar-inspired 3D animation content only.
- No storyboard line art, no hand-drawn sketch texture, no labels, no subtitles unless requested, no watermarks.
- Preserve the approved screen size / aspect ratio and the approved resolution from the resolution choice card.

### Prompt format selection

Write each video prompt using the `h3-prompt-writing` skill when it is available (this is the preferred format, especially for H3).

- If the `h3-prompt-writing` skill is available, invoke it to author each single-shot video prompt following its structure (integrated multimodal description, overall soundscape, non-diegetic music, keyframe alignment, and reference labels where applicable).
- If the `h3-prompt-writing` skill is not available, ask the user whether to install it, or fall back to the default prompt rules below.

### Model-specific prompt shaping (default rules when h3-prompt-writing is unavailable)

The text storyboards document (or the extracted standalone node for that shot) feeds both models, but the prompt prefix around the storyboard differs:

- **H3 prompt prefix** (default): emphasize packaging keywords, design language, motion clarity, text/UI presence when relevant, and dual-channel audio intent. H3 is strong at instruction following, so the per-second directive can be sent almost verbatim. Add: `Pixar-inspired 3D cartoon rendering, C4D + Octane look, stylized Q-version proportions, warm SSS skin, designed-with-detail hair, strong character design language, clean motion, on-brand color palette`.
- **Seedance 2.0 prompt prefix** (performance fallback): emphasize cinematic camera language, elastic squash-and-stretch, anticipation, follow-through, lighting drama, and lens choice. Add: `cinematic Pixar-quality 3D animation, elastic squash-and-stretch performance, Disney-style anticipation and overshoot, dramatic key lighting, lens-specific depth of field`.

When the user picked `per-shot mixed`, apply the prefix that matches the row's `video_model` field.

### After all video prompts are written

Place the resulting video prompts on canvas in shot order, group them as `<title> shot video prompts`, and show a user choice card:

- Approve prompts and hand off to the video generation tool (recommended)
- Rewrite selected prompt (with the same or a different target model)
- Fix character mismatch
- Fix scene mismatch
- Strengthen storyboard cleanup
- Fix spatial anchor drift across prompts
