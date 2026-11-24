# English packs (knks_lang === 'en')

When the user chooses English, `knks-i18n.js` translates all visible page
content (static UI and JavaScript-generated results). Dictionaries load
per page so the home page stays light:

- `pack-core.js` — shared legal/UI glossary and word map (all pages)
- `pack-vbpl.js` — Legal Database: UI glossary (hand-curated) plus English for every record
- `pack-vbpl-2026.js` — Legal Database records verified in 11/2026 (hand-maintained; overrides `pack-vbpl.js`)
- `pack-vanphong.js` — Office professional skills
- `pack-kiemsat.js` — Criminal/civil/judgment-execution/complaints tools
- `pack-tools.js` — calculators, templates, anonymizer, converters, etc.

Phrase values in the auto packs come from a Vietnamese→English neural MT pass
(11/2026) with legal-terminology post-editing (Procuracy, Procurator, precedent,
judgment enforcement…), document numbers kept as-is without diacritics
(152/2026/ND-CP, 04/2026/NQ-HDTP) and placeholder checks (`{n}`, `${…}`, tags).
`knks-i18n.js` also translates composite labels segment by segment
(`Kind · Field`, `GROUP › Item`, `Label: value`) and common patterns
(`N văn bản`, `Năm YYYY`, `Lọc: “…”`, `Mẫu …`) before falling back to words.

Service worker cache: `knks-v45`. Audit: `scripts/scan-en-leftovers.mjs`.

Thuật ngữ pháp lý EN thống nhất: xem `i18n/GLOSSARY.md`.
