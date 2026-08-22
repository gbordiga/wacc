# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Data

- Updated country risk-free rates and market risk premiums from Fernandez 2025 (2024 survey used where a country is missing).
- Updated Damodaran global sector betas, country tax rates, and default spreads to the January 2026 tables.
- Replaced Duff & Phelps size premiums with Kroll 2025.
- Adjusted calculator defaults to the new USA / software mid-cap starting point.

### Calculator

- Rebuilt the form into clearer sections with searchable country, tax, sector, and size controls.
- Added a live WACC bar and a detailed results breakdown, including KaTeX formulas.
- Added Hamada leverage warnings when D/E is extreme or coverage is weak.
- Allowed setting either unlevered or levered beta, with the other derived.
- Added a printable A4 report with company name and as-of date.
- Added a light/dark theme toggle.

### SEO

- Added sitemap, robots.txt, canonical URLs, Open Graph / Twitter cards, and JSON-LD.
- Added `/llms.txt` and a custom 404 page.
- Converted `/calculator` to a permanent redirect to `/`.
- Published a WACC guide, a WACC vs cost of equity article, and a Damodaran WACC article, with internal links and FAQ markup.

### Fixed

- Grouped print-report integers without locale APIs so server and client markup match.
