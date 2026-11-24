# English packs (knks_lang === 'en')

When the user chooses English, `knks-i18n.js` translates all visible page
content (static UI and JavaScript-generated results). Dictionaries load
per page so the home page stays light:

- `pack-core.js` — shared legal/UI glossary and word map (all pages)
- `pack-vbpl.js` — Legal Database
- `pack-vanphong.js` — Office professional skills
- `pack-kiemsat.js` — Criminal/civil/judgment-execution/complaints tools
- `pack-tools.js` — calculators, templates, anonymizer, converters, etc.

Service worker cache: `knks-v41`. Audit: `scripts/scan-en-leftovers.mjs`.
