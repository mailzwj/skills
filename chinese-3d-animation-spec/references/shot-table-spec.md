# Standardized Shot Table Specification

## STEP 5: Standardized Shot Table Video Prompts (Six Columns)

After character cards, scene cards, and the opening title segment design are locked, output standardized video prompts as a shot information table. This step is mandatory and cannot be swapped with storyboard or video generation. Create a canvas table node or markdown table named `标准镜头信息表` or `standard-shot-table`.

The table must have exactly six columns in this order:

| Shot ID & Duration | Continuity Handoff | Reference Anchors (Spatial + Identity) | Hook Type | Shot Description (Per-Second Directives) | Audio & Dialogue Track |
|---|---|---|---|---|---|

Column rules:

- **First row is S01**: its `Shot Description` must open with the `Opening Title Segment (0–3/5s)` block from Step 4.5 — exact title and author credit, typography entrance/hold, optional thematic scene/character background, and the internal transition into the story action — then continue directly into S01's story per-second directives with no time gap. S01's `Hook Type` is its story hook, not `title-card`; S01 carries both the title reveal and its own story hook. Its identity bindings are `characters: none | <exact card names>` and `scene card: none | <exact card name>`; title-segment thematic references are recorded separately from S01's story-action on-screen characters.
- **Shot ID & Duration**: shot number plus planned duration, e.g. `S03 / 6s`.
- **Continuity Handoff**: how this shot naturally continues from the previous shot’s ending image, prop position, eyeline, character posture, sound bridge, or emotional state, AND how it sets up the next shot’s opening. This is the cross-shot continuity spine.
- **Reference Anchors (Spatial + Identity)**: four sub-fields, all mandatory.
  - `Fixed Landmarks` — exact named landmarks from the scene card, with their screen-relative positions (e.g. `stone-bridge: right third`, `altar: center bottom`).
  - `Character Positions (camera view)` — for every character in the shot, screen-relative position (left/center/right, top/mid/bottom, foreground/midground/background), facing direction, and initial pose.
  - `Exited Character Status` — for any character who was in the previous shot but is not in this shot, state their off-screen position and reason (e.g. `Heroine — exited frame-left, last seen holding the lantern at the stone-bridge`).
  - `Lighting Baseline` — inherited key/fill/rim direction from the scene card, plus any per-shot modifier (e.g. `key: high soft key, fill: cool bounce right, modifier: silk backlit translucency`).
  - Plus identity bindings: exact approved character card names and exact approved scene card name.
- **Hook Type**: one short label from a controlled vocabulary, e.g. `visual-joke`, `reversal`, `suspense`, `tender`, `chase`, `reveal`, `callback`, `expression-beat`. S01 uses its story hook too; the title reveal is recorded inside `Shot Description` and does not occupy a vocabulary slot. Used for the per-episode hook distribution self-check.
- **Shot Description**: shot size, camera movement, Dutch-angle design, performance style, SFX, negative prompt, **video-model generation notes** (the model chosen in Step 7 — H3 or Seedance 2.0 — receives slightly different prompt shapes; for H3 emphasize art direction, atmosphere, material/volumetric light and particle layering, for Seedance 2.0 emphasize cinematic camera, complex staging, and physically grounded action), and a required `Per-Second Directives` subsection. The subsection must break the shot into second-by-second instructions such as `0–1s`, `1–2s`, `2–3s`; for sub-second critical beats, use `2.0–2.5s` style markers. Each per-second directive MUST cover all five required elements:
  1. Action / pose / expression (weight shift, breath, anticipation and follow-through, cloth and hair secondary motion, micro-expression change)
  2. Camera movement (slow push / slow pull / slow pan / slow tilt / very subtle handheld / locked / orbit)
  3. Spatial position (where the character is, what they hold, what landmark is in frame)
  4. Audio cue (narration / dialogue / SFX / breath / silence — or `silent` if intentional)
  5. Handoff to the next second or next shot (what state this second locks in for the next one)
- **Audio & Dialogue Track**: full audio script for the shot in time order, separate from per-second cues. Fields:
  - `Narration` — voiceover text with time range (omit if no narration).
  - `Dialogue` — line, speaker, tone, time range.
  - `SFX` — keyed sound effects, time-anchored.
  - `Performance Note` — when the protagonist is narrating off-screen, mark `narrator-mouth-closed: true`; describe expression path during narration; describe concrete eye-line and body-action changes for each dialogue line.

Table-wide rules:

- Each shot must naturally inherit the previous shot’s image state through the `Continuity Handoff` column and set up the next shot in the same column.
- Each shot row must include per-second directives that cover the entire shot duration from first frame to last frame, including action, pose, expression, camera movement, spatial position, sound cue, and continuity handoff.
- Per-second directives must be specific enough to generate storyboard panels directly; avoid vague timing such as “continues moving” without body, camera, or prop detail.
- Performance must be realistic, restrained, and weighty: complete anticipation, follow-through, settle, and overlapping action, with clear readable motion. Emotion is carried mainly by eye-line, breath, micro-expression, weight shift, and the secondary motion of cloth and hair. No squash-and-stretch cartoon deformation.
- Shot sizes must alternate close-up / extreme close-up with other necessary framing; avoid repetitive framing.
- Dutch-angle tilted compositions are reserved for imbalance, pressure, shock, or high-impact beats, and used sparingly in this style — never for slapstick comedy.
- Dialogue language only if explicitly requested by the user; otherwise use minimal non-language-specific reactions or mark dialogue as optional / pending confirmation.
- For shots containing narration or dialogue, every second where the character is speaking must record whether the mouth is open or closed; the default is closed for off-screen narrator, open for on-screen dialogue.
- A character who left the frame must still be tracked in `Exited Character Status` for at least one shot, then dropped after they are explicitly off-stage for two consecutive shots.

Then show a user choice card:

- Approve table and run self-check (recommended)
- Adjust shot continuity
- Increase performance intensity and motion layering
- Adjust close-up / extreme-close-up rhythm
- Adjust Dutch-angle design

## STEP 5.5: Shot Table Self-Check Gate (Mandatory)

Before moving to pencil storyboards, run a hard self-check on the approved shot table. If any check fails, revise the table and re-run before asking the user to approve storyboarding.

Seven required checks:

1. **Hook density**: every shot has a `Hook Type`; from S01 onward, at least one of every three consecutive story shots uses a `reveal`/`reversal`/`callback`; S01 and the closing shot each carry a strong hook (`visual-joke` / `reversal` / `reveal` / `suspense` / `tender`). S01 also carries the title reveal, but the reveal does not occupy a hook slot and S01 must still have its own story hook.
2. **Single-shot duration**: no shot exceeds 15 seconds. If a beat needs more, split it.
3. **Character count per shot**: no shot contains more than three important characters (defined as characters with on-screen action or dialogue).
4. **Spatial anchor inheritance**: for every interior scene with two or more shots, the `Fixed Landmarks` and `Lighting Baseline` of the next shot must either match the previous shot or include an explicit continuity note (e.g. `stone-bridge moves from right third to center as camera orbits left`).
5. **Per-second directive coverage**: every second from `0s` to the shot duration is covered by a `Per-Second Directives` entry, and each entry contains all five required elements (action/pose/expression, camera, spatial, audio cue, handoff). Sub-second beats like `2.0–2.5s` are allowed but must not leave any time gap.
6. **Cross-shot continuity**: reading the `Continuity Handoff` column row by row produces a continuous chain starting from S01's story action — S01's `0s` is the title segment, which must resolve into the story action with no time gap; after that, no shot starts from a state that contradicts the previous shot's ending. Any shot that flips eyeline, character position, prop state, or lighting must mark the flip explicitly (e.g. `HARD CUT — time skip: 2h`).
7. **Opening title segment integrity**: the first row is S01 and there is no S00; S01's `Shot Description` opens with the `Opening Title Segment (0–3/5s)` block; the title and author credit match the user-approved strings verbatim; the font style is recorded and is exactly one of splash-ink brush / blade-edge lettering (or the user's specified style), never mixed; any referenced character or scene uses exact approved card names and stays thematic (still environment / calm portrait / silhouette / defocused presence) with no plot action, no dialogue, and no story props beyond the bound cards, or the binding is `none`; the segment holds for 3–5 seconds at S01's head and stays legible; typography remains dominant; the segment resolves into S01's story action through a named internal transition with matching composition / lighting / particles / motion; S01's total duration covers the segment plus its story beat and stays within 15 seconds.

If all seven pass, place a `shot-table self-check: passed` stamp at the top of the canvas table node and show the user choice card:

- Approve self-check and draw shot storyboards (recommended)
- Show self-check details
- Revise failed checks
- Re-run self-check

If any check fails, do not enter Step 6. Return to Step 5, list the failed rows, and only re-show the storyboard approval card after the table is fixed and the self-check passes.
