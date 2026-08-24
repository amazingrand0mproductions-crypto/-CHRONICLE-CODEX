🧠 CHRONICLE CODEX

CHRONICLE CODEX is a standalone continuity and auto-Codex system for AI Dungeon.

It watches the actual adventure history, identifies important named people, places, objects and organisations, creates Story Cards only when the evidence is strong enough, refreshes those cards when canon materially changes, keeps live Plot Essentials and Author's Note aligned with the story, and gives active NPCs a compact behavioural continuity layer called Character Current.

The design goal is simple:

Remember more. Invent less. Update only when the story earns an update.

✨ Core systems

📚 1. Chronicle Codex

CHRONICLE CODEX can automatically maintain four Story Card families:

👤 Characters

📍 Locations

🗡️ Items / vehicles / important objects

🏛️ Factions / organisations / businesses / groups

It does not treat every capitalised phrase as lore. Detection builds confidence across story actions and combines multiple kinds of evidence before an automatic card is eligible.

Detection now includes:

evidence accumulated across multiple turns

independent Character / Location / Item / Faction type voting

configurable confidence strictness

configurable mention and distinct-turn gates

explicit naming and typed-description cues

title handling (Dr. Helena Cross, Captain Jean-Luc Picard)

apostrophes, hyphens, digits and common accented Latin characters

connector-heavy names (Order of the Phoenix, Mara de la Cruz)

dotted acronyms (S.H.I.E.L.D.)

venue and place suffixes (Starlight Books, Wayne Manor, Iron Citadel)

movement/location language (into, through, near, arrived at, etc.)

possession/use language for objects and vehicles

organisation behaviour such as announcing, recruiting, raiding, voting or negotiating

alias evidence, explicit alias merging and article-variant merging (Moonfang / The Moonfang)

product/brand modifier protection

generic-word and sentence-starter filtering

player-character name exclusion

word-boundary matching

duplicate-card and trigger-collision guards

retry / undo evidence rollback

stale-candidate pruning

separate switches for every card type

Example classification

Later Sarah left the station.

→ Sarah = Character

You walk through Gotham after dark.

→ Gotham = Location

You drive the Batmobile through the tunnel.

→ Batmobile = Item

The Black Hand threatened the mayor.

→ Black Hand = Faction

R2-D2 is a droid who follows you.

→ R2-D2 = Character

You pick up a Nintendo console.

→ does not create a Nintendo character

🔄 2. Conservative Story Card refresh

Creating the right card is only half the problem. Long stories also need cards to remain accurate.

Managed cards collect new evidence local to that entity. A dramatic event elsewhere in the same action does not automatically become evidence for everyone mentioned in the paragraph.

A refresh worker is only scheduled after the configured evidence and cooldown gates are satisfied. It is instructed to:

preserve every still-true useful fact

add only durable facts supported by recent story evidence

remove or correct facts explicitly invalidated by later canon

keep the entity's name inside the Entry

avoid cosmetic rewrites

return unchanged when the current card is already sufficient

🛡️ Manual-edit protection

With:

protectManual=true

CHRONICLE CODEX fingerprints the last version it wrote. If you manually change a managed card's title, triggers, type or Entry, automatic refresh protects that card instead of fighting your edit.

To accept your manual version as the new baseline and resume management:

/lc resume <name>

🧭 3. Chronicle Plot Memory

Plot Essentials and Author's Note are independent systems.

Plot Essentials

The generated Plot Essentials segment keeps durable current canon, such as:

protagonist state and important current location

active goals and commitments

important relationships

unresolved obligations, dangers and deadlines

significant possessions or conditions

rules currently affecting play

major established revelations that should survive context loss

It is deliberately not a scene-by-scene diary.

Author's Note

The generated Author's Note is about how the next scene should be written, not about storing lore.

It can maintain concise direction for:

genre

tone

pacing

atmosphere

POV / prose emphasis

current scene mode

It is explicitly told not to seize player agency.

Change-aware timing

plotEvery and authorEvery are minimum assessment intervals, not forced rewrite timers.

When a component becomes due, CHRONICLE CODEX first scores recent story change. If nothing meaningful happened, the assessment is deferred. Even when a worker runs, it can return unchanged.

This prevents memory churn from ordinary dialogue, travel filler and repeated information.

🌊 4. Character Current

Character Current is a compact narrator-side continuity layer for active NPC Character cards.

It can track:

Mood — present emotional posture

Immediate intent — what the character currently wants to happen

Pressure — fear, tension or constraint acting on them

Working assumption — how they privately interpret the current situation

Restraint — what they are presently choosing not to say, when supported

Unknown fields may remain empty.

The system is explicitly forbidden from manufacturing dramatic secrets merely to fill a field. It should not invent affairs, betrayals, hidden identities, secret powers, crimes, prophecies or master plans without story evidence.

When:

currentInfluence=true

a small number of recently active NPC snapshots can feed narrator-only guidance back into generation. That guidance can shape hesitation, attention, tone, choices and subtext, but it cannot make private information magically known or force a confession/reveal.

Old Character Current snapshots stop influencing narration after currentExpiry actions without a fresh update.

⚙️ Configuration

On first use, CHRONICLE CODEX creates:

CHRONICLE CODEX — Config

Edit only the values after = in the card Entry. Full explanations are automatically kept in the card Notes, so the live config stays comfortably below AI Dungeon Story Card Entry limits.

Invalid numbers are clamped to safe ranges and the Entry is normalised automatically.

Master

master=true

false disables automatic detection, Codex work, memory maintenance, Character Current checks and hidden influence while preserving existing cards and saved script state. Script memory overrides are released.

Codex

codex=true
codexCreate=true
codexRefresh=true
trackCharacters=true
trackLocations=true
trackItems=true
trackFactions=true
adoptLegacy=true
adoptManaged=true
mentions=2
distinctTurns=2
detectionStrictness=2
codexCooldown=3
refreshEvidence=3
refreshCooldown=18
protectManual=true
cardMax=1200

Setting

Meaning

codex

Master switch for automatic Codex intelligence

codexCreate

Allow new automatic Story Cards

codexRefresh

Allow managed-card refreshes

trackCharacters

Enable Character detection/refresh

trackLocations

Enable Location detection/refresh

trackItems

Enable Item detection/refresh

trackFactions

Enable Faction detection/refresh

adoptLegacy

One-time adoption of compatible older Codex log cards

adoptManaged

Re-link CHRONICLE CODEX cards if script state was reset but cards survived

mentions

Evidence observations required before automatic creation, 1–20

distinctTurns

Separate story actions required, 1–10

detectionStrictness

Type-confidence gate, 0–4; 2 recommended

codexCooldown

Minimum actions between automatic new cards, 0–100

refreshEvidence

Novel relevant snippets required for refresh, 1–10

refreshCooldown

Minimum actions before the same card may refresh again, 1–500

protectManual

Protect manually edited managed cards

cardMax

Maximum generated Entry length, 300–2000

evidencePerEntity limits how many snippets are sent to the maintenance worker. Detection can retain additional compact observations internally so high mentions / distinctTurns settings remain achievable.

Plot memory

plotEssentials=true
authorsNote=true
plotEvery=6
authorEvery=10
memorySensitivity=2
plotMax=1800
authorMax=550
preserveManualMemory=true
memoryMirror=true

Setting

Meaning

plotEssentials

Maintain generated live Plot Essentials

authorsNote

Maintain generated live Author's Note

plotEvery

Earliest Plot Essentials assessment interval, 2–100

authorEvery

Earliest Author's Note assessment interval, 2–100

memorySensitivity

Required recent-change score, 0–8; higher updates less often

plotMax

Generated Plot Essentials cap, 500–4000

authorMax

Generated Author's Note cap, 150–1200

preserveManualMemory

Preserve manually supplied/base memory alongside generated memory

memoryMirror

Maintain a non-triggering inspection card showing generated segments

CHRONICLE CODEX also watches for external manual memory changes while its generated override is active and, where the scripting state exposes them distinctly, adopts those edits as the new preserved base instead of flattening their formatting.

Character Current

characterCurrent=true
currentInfluence=true
currentEvery=4
currentSensitivity=1
currentInfluenceCharacters=2
currentMax=700
currentExpiry=36

Setting

Meaning

characterCurrent

Maintain NPC continuity snapshots

currentInfluence

Allow recent snapshots to guide narration subtly

currentEvery

Earliest automatic assessment interval, 2–100

currentSensitivity

Behaviour/change threshold, 0–4

currentInfluenceCharacters

Maximum active NPC snapshots used per generation, 1–3

currentMax

Maximum Character Current Notes block, 250–1200

currentExpiry

Stop using stale snapshots after this many actions, 8–200

General

storyWindow=14
evidencePerEntity=6
messages=true

Setting

Meaning

storyWindow

Recent adventure actions used for evidence/scheduling, 6–30

evidencePerEntity

Recent snippets sent per candidate/entity, 2–10

messages

Small command/status notices

🎮 Commands

/lc status
/lc memory
/lc card <name>
/lc current <name>
/lc resume <name>
/lc rescan
/lc help

/lc status

Creates or refreshes CHRONICLE CODEX — Status with candidates, type confidence, aliases, managed/protected cards, generated-memory state, current snapshots, update counts and worker backoff state.

/lc memory

Forces a Plot Essentials / Author's Note assessment for whichever memory components are enabled.

/lc card <name>

Forces a create/refresh assessment for a named entity. Automatic evidence gates are intentionally stricter than this explicit command.

/lc current <name>

Forces a Character Current assessment for one unique Character card.

/lc resume <name>

Accepts the card's current manual title/triggers/type/Entry as the new managed baseline and resumes automatic refresh.

/lc rescan

Clears recent detection evidence and rebuilds it from the current history window. Useful after major retries/rewrites or detector setting changes.

Control commands are filtered from story evidence.

🔧 How the maintenance worker works

AI Dungeon scripts do not get a separate background model call for bookkeeping. CHRONICLE CODEX therefore schedules at most one hidden maintenance job into an eligible story generation.

For normal automatic jobs:

the model writes the normal continuation

it appends one strict JSON payload inside <CHRONICLE_CODEX_DATA>...</CHRONICLE_CODEX_DATA>

Output validates the task ID and schema

valid changes are saved

the metadata block is removed before the player sees the response

For explicit /lc maintenance commands, the worker is instructed to return metadata only and not advance the story.

If metadata is missing, malformed, mismatched or unsafe, no update is accepted. The worker enters an increasing backoff instead of retrying every generation.

A rejected create candidate also waits for new evidence before it can be reconsidered, preventing endless retry loops.

🛡️ Reliability safeguards

The script is deliberately biased toward doing nothing when uncertain.

Safeguards include:

strict task IDs

strict update / unchanged / skip handling

model-output validation and sanitisation

exact create-title validation

explicit card-type allowlists

type-confidence score + margin gates

collision-aware triggers

forced entity naming inside generated Entries

local refresh evidence rather than whole-action contamination

multi-mention local scoring so later material changes in long actions are not missed

article-variant alias merging so Moonfang and The Moonfang reinforce one entity instead of producing duplicates

duplicate and near-duplicate evidence rejection

manual title/trigger/type/Entry protection

stable-card-ID recovery after manual renames

automatic re-linking after script-state loss

alias ambiguity handling

retry / undo evidence rollback

stale evidence, candidate, alias and missing-card cleanup

bounded saved state

Character Current expiry

scheduler fairness between memory, create, refresh and NPC-state work

failure backoff without falsely advancing completed-check timestamps

scheduler ageing so overdue maintenance classes gain priority instead of starving indefinitely

hidden metadata stripping, including incomplete trailing blocks

context-budget clipping that preserves both the maintenance task header and required output schema

preservation of the existing memory prefix when context is tight

⚡ Performance and hook safety

AI Dungeon currently gives each scripting hook a limited execution window, so CHRONICLE CODEX is designed to avoid repeated whole-world scans.

The rebuilt core now uses:

one reusable Story Card index per pass

stable ID lookup plus title/alias fallback

cached detector/set lookups

bounded candidate, alias, refresh and current-state collections

targeted active-character lookup

cheap significance scoring before a maintenance worker is scheduled

at most one hidden maintenance task per eligible generation

fail-closed parsers that reject malformed or mismatched worker output

A synthetic 1,000-Story-Card regression world remains comfortably inside the current hook timeout in the supplied test harness. The important goal is not a benchmark number; it is keeping work proportional and bounded as an adventure grows.

Function-wide rebuild

This pass was audited against the previous core at function level. Every previously shared named Library function was changed, replaced or retired, and the Input, Context and Output wrappers were hardened as well. The last holdouts—the Story Card key parser and model-type normaliser—were rewritten to improve key sanitation, deduplication and tolerant-but-unambiguous type handling.

🧠 AI Dungeon memory limitation

AI Dungeon exposes live Plot Essentials and Author's Note to scripts through:

state.memory.context
state.memory.authorsNote

A script can override those context values, but changing them does not rewrite the visible Plot Essentials / Author's Note editor fields.

For visibility, memoryMirror=true maintains:

CHRONICLE CODEX — Memory Mirror

It shows only the script-generated Plot Essentials and Author's Note segments. Its trigger is an internal sentinel so it is not intended to activate as ordinary world lore. If memoryMirror=false, any existing mirror is scrubbed so old generated text is not left looking current.

📦 Installation

AI Dungeon scripts use four script tabs. Copy each file into its matching tab:

File

AI Dungeon tab

Library.js

Library

Input.js

Input

Context.js

Context

Output.js

Output

The Input, Context and Output files already call their required modifier(text) function and include fail-safe recovery so a bookkeeping error does not intentionally expose hidden maintenance metadata or replace normal story text with an empty response.

Start or continue the adventure and take an action. CHRONICLE CODEX will create its Config card automatically.

🧪 Tuning recipes

Too many cards

detectionStrictness=3
mentions=3
distinctTurns=3

Too few cards

detectionStrictness=1
mentions=2
distinctTurns=1

Cards refresh too often

refreshEvidence=4
refreshCooldown=25

Plot memory updates too often

memorySensitivity=3
plotEvery=8
authorEvery=12

NPC guidance feels too noticeable

currentInfluence=false

Character Current may continue tracking while narration influence is disabled.

Stop all automation immediately

master=false

📁 Package contents

Library.js
Input.js
Context.js
Output.js
README.md
REDDIT_DESCRIPTION.md
SCENARIO_DESCRIPTION.md

Final principle

CHRONICLE CODEX is not supposed to be another narrator competing with the story.

It is the continuity layer underneath it: watch carefully, require evidence, preserve canon, and stay quiet when nothing needs changing.
