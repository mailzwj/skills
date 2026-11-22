# Video Model Selection and Prompt Shaping

## STEP 7: Video-Model Choice Card + Single-Shot Video Prompts

### Video-model choice card (mandatory before any video prompt is written)

Before any video prompt is written, show the video-model choice card. The choice determines the prompt format for every shot and is stored in the Project Brief, reused for every shot in this project unless the user later changes it.

Video model card:

- **H3 (recommended default)** — strong on visual packaging, art direction and atmosphere, motion graphics, text/UI clarity, multi-modal context understanding, and cost efficiency. Native dual-channel audio. Best for: guofeng photoreal-CG shorts driven by art direction and mood, particle and volumetric layers, opening title segments with exact on-screen text, subtitles, dialogue-driven beats where the audio is part of the deliverable. **Prompt mode: Ref2VA by default, with the approved character and scene cards as global reference material.** This model's prompts are written with the `h3-prompt-writing` skill.
- **Seedance 2.0 (fallback for high-intensity realistic action)** — strong on cinematic camera, complex choreography, staging, action tension, and physically grounded motion. Best for: chase sequences, fight beats, climax shots where the selling point is the action and camera work itself rather than the packaging.
- **Per-shot mixed (advanced)** — let the user mark `video_model: H3` or `video_model: Seedance2` in the `Shot Description` column of individual rows. Use this when the project has both atmosphere-heavy and action-heavy shots. The default for unmarked rows is H3.

### Resolution choice card (after video model)

Once the video model is locked, show the resolution choice card so the resolution can be recorded into the prompt spec:

- 768P (recommended for H3 first pass; cost-efficient)
- 2K (H3 default quality; higher cost, sharper final render)
- 1080p (recommended for Seedance 2.0)
- 720p (Seedance 2.0 draft; lowest cost)
- Match project / custom resolution

The user must confirm a resolution before the first video prompt is written. Resolution can be changed per shot later if the user wants a hero shot at higher detail.

### Single-shot video prompt generation

For each approved table row, write a single-shot video generation prompt. Write S01 first, from its opening title segment block and story section plus the approved title/author strings. Each prompt must be written from the matching section of the text storyboards document (extracted standalone node if that section was extracted, otherwise the in-document section), the character card name(s), and the scene card name from that row. For H3, the card names map to card images in the global reference manifest, described below.

### H3 Ref2VA global reference contract (default when H3 is selected)

H3 prompts default to Ref2VA whenever the project has approved character or scene cards. The cards form the project's global reference library — they are the identity and environment source, not optional inspiration.

1. **Build the manifest first.** Before the first H3 prompt, create a canvas text node named `全局参考素材清单` / `global-reference-manifest`. One row per approved card:
   - `Subject ID` — stable project-global `<Subject N>`, assigned once, character cards first then scene cards.
   - `Card type` — character / scene.
   - `Exact card name`.
   - `Card image` — generated image path or `pending`.
   - `Appears in` — shot IDs.
   The manifest is the single source of truth. Never renumber a Subject ID between shots.
2. **Write each H3 shot as a Ref2VA rewrite.** Use the six sections in order: `subject_definitions`, `summary`, `retention_analysis`, `detailed_description`, `overall_soundscape`, `non_diegetic_music`. A single-shot prompt contains one `[Shot 1]`. Invoke `h3-prompt-writing` in full-reference mode and follow its Ref2VA guide when available.
3. **Bind the cards the shot uses.** Attach every on-screen character card plus the shot's scene card. For S01, also attach the thematic cards used by its opening title segment. In the prompt, `<Picture N>` labels are local to that job's attachment list; `<Subject N>` IDs stay global. Define each subject by citing the card image: `<Subject 1> is the character in <Picture 1>, ...`; for an environment: `<Subject 3> is the environment in <Picture 2>, ...`. Do not re-invent identity, costume, or environment from prose when a card exists. A shot with no card at all may use T2VA.
4. **Retention analysis.** Characters: `fully_preserved` for identity, face, hair, body proportions, costume, and signature props. Scene: `fully_preserved` for layout, landmarks, materials, and lighting baseline; use `partially_preserved` only when the storyboard explicitly changes time, weather, or light, and state the change. New story actions are not reference-fidelity losses.
5. **S01 title-segment exception.** S01 opens with the 3–5 second title segment. If the segment references thematic cards, write Ref2VA with those cards (plus any story-action on-screen cards). If it references no cards and none are on screen, use T2VA; if an approved S01 opening-frame image is supplied, I2VA. Keep the exact title/author strings and the chosen font style, and keep title-segment referenced subjects non-performing.
6. **Missing images.** If card images have not been generated yet, keep Ref2VA and mark them `pending` in the manifest; the prompt becomes runnable once the images are attached. Fall back to T2VA only when the user explicitly declines reference images or no cards exist. Never silently downgrade.
7. **Reference budget.** If the H3 job cannot accept the full attachment set, prioritize on-screen character cards, then the shot's scene card, then S01 title-segment thematic cards. Never drop a protagonist's card silently; if the limit forces a drop, split the shot or surface the tradeoff to the user.
8. **Mixed mode.** Only H3 rows use this contract; Seedance rows use the Seedance prompt rules.

Per-shot rules common to all target models:

- Use the text storyboards document as the authoritative per-shot reference for narrative, composition, camera movement, action staging, per-second timing, and shot number. For shots that have been extracted to a standalone node, read the extracted node instead. If a pencil image storyboard also exists, use it only for human-side pose / silhouette pre-check; do not let it override the text storyboard.
- Use character card names as the authoritative identity source (for H3, the card image in the global reference manifest is the identity source).
- Use scene card names as the authoritative environment source (for H3, the card image in the global reference manifest is the environment source).
- **S01 opening title segment rule**: reproduce the title and author credit verbatim inside the first 3–5 seconds of S01, keep the typography stable and legible for the full segment, add no extra text, and resolve into S01's story action through the named internal transition. The segment may reference at most one scene card and two character cards as thematic background; when it does, bind the exact names and keep them thematic and non-performing (still environment / calm portrait / silhouette / defocused presence) with no plot action. For H3, write S01 as Ref2VA when it references cards; otherwise T2VA only when no card is attached (or I2VA with an approved S01 opening-frame image). When exact on-screen text is the deliverable, prefer H3 for S01 even in per-shot mixed mode; if action staging forces S01 onto Seedance, keep the title segment inside S01 and flag the text-rendering risk instead of splitting it into a separate shot.
- **Strip all storyboard double-binding labels** (`[char:…]`, `[scene:…]`, `[shot:…]`, `[dur:…]`, `[hook:…]`) from the prompt content — these labels are storyboard-only reference markers and must NOT appear in the final video prompt. Pencil image storyboards additionally have their own shot numbers, camera icons, arrows, and notes that must not be carried into the prompt. **H3 Ref2VA reference labels are not storyboard labels**: keep `<Subject N>`, `<Picture N>`, `<Video N>`, and `<Audio N>` intact.
- The prompt must describe clean full-color cinematic CG content in the locked style only.
- Append the style lock token string from the SKILL's Global Visual Style Lock to every prompt.
- No storyboard line art, no hand-drawn sketch texture, no labels, no subtitles unless requested, no watermarks.
- Preserve the approved screen size / aspect ratio and the approved resolution from the resolution choice card.

### Prompt format selection

Write each video prompt using the `h3-prompt-writing` skill when it is available (this is the preferred format, especially for H3).

- If the `h3-prompt-writing` skill is available, invoke it in full-reference mode for H3 and author each single-shot Ref2VA prompt from the global reference manifest (six sections, subject definitions bound to the card images, global subject IDs preserved). For Seedance prompts, follow its base structure.
- If the `h3-prompt-writing` skill is not available, ask the user whether to install it, or fall back to the six-section Ref2VA rules above for H3 and the default prompt rules below for Seedance.

### Model-specific prompt shaping (default rules when h3-prompt-writing is unavailable)

The text storyboards document (or the extracted standalone node for that shot) feeds both models, but the prompt wrapper differs. H3 Ref2VA does not use the H3 base prefix: write the six Ref2VA sections and still append the style lock token.

- **H3 base prompt prefix** (only for the no-card T2VA fallback): emphasize art direction and atmosphere, materials and volumetric light, particle and mist layering, motion and text clarity when relevant, and dual-channel audio intent. H3 is strong at instruction following, so the per-second directive can be sent almost verbatim. Add: `cinematic Chinese guofeng photoreal CG, next-gen game cinematic quality, desaturated moon-white and frost-blue palette, soft volumetric lighting, translucent silk backlight, strand-level hair detail, ink-wash mountain haze, shallow filmic depth of field, minimalist oriental negative-space composition, high-key low contrast, subtle film grain, restrained realistic performance`.
- **Seedance 2.0 prompt prefix** (high-action fallback): emphasize cinematic camera language, complex staging, realistic action weight and inertia, physically grounded cloth and hair simulation, lighting drama, and lens choice. Add: `cinematic Chinese guofeng photoreal CG, realistic weighty performance, anticipation and follow-through, physically grounded cloth and hair simulation, dramatic backlit atmosphere, volumetric haze, lens-specific shallow depth of field, subtle film grain`.

When the user picked `per-shot mixed`, apply the matching wrapper per row: H3 rows use Ref2VA (or T2VA only when no card exists), Seedance rows use the Seedance prefix.

### After all video prompts are written

Place the resulting video prompts on canvas in S01, S02… order, group them as `<title> shot video prompts`, keep the `global-reference-manifest` next to the group when H3 is used, and show a user choice card:

- Approve prompts and hand off to the video generation tool (recommended)
- Rewrite selected prompt (with the same or a different target model)
- Fix character mismatch
- Fix scene mismatch
- Strengthen storyboard cleanup
- Fix spatial anchor drift across prompts
