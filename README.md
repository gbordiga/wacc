# WACC Calculator

A modern web application for calculating the Weighted Average Cost of Capital (WACC) based on industry-standard financial models and data sources.

## Features

- **Industry Data Integration**: Uses Damodaran, Fernandez and Duff and Phelps data for accurate financial calculations
- **Comprehensive Parameters**: Includes all critical WACC components:
  - Cost of Equity (CAPM model with size premium)
  - Cost of Debt (based on risk-free rate and spreads)
  - Capital Structure (equity/debt ratios)
  - Tax Effects (country-specific marginal tax rates)
- **Size Premium Analysis**: Calculates size premiums based on market capitalization
- **Debt Rating**: Estimates debt spreads from Interest Coverage Ratio (ICR)
- **Country & Sector Specific**: Tailored calculations based on geographic regions and industry sectors
- **Visualized Results**: Clear breakdown of all components and calculations

## Data sources

- **Risk-Free Rate and Market Risk Premium**: Fernandez, [Survey: Market Risk Premium and Risk-Free Rate](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4754347)
- **Beta by Industry**: Damodaran, [Betas by Sector (US)](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/Betas.html)
- **Corporate Marginal Tax Rates**: Damodaran, [Corporate Marginal Tax Rates - By country](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/countrytaxrates.html)
- **Size Risk Premium**: Duff & Phelps (2023), Cost of Capital Navigator

## Technology Stack

- Next.js with App Router
- TypeScript
- React Hook Form
- Shadcn UI Components
- Server-side API for calculations

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to use the calculator.

## Usage

1. Select country and industry sector
2. Enter company size (market capitalization)
3. Provide capital structure details (equity/debt ratios)
4. Add financial metrics (EBIT, interest expenses)
5. Review and adjust suggested parameters if needed
6. Calculate WACC and analyze the detailed breakdown

## Data Sources

- Risk-free rates and market risk premiums: Fernandez 2024
- Industry betas and sector data: Damodaran January 2025
- Marginal tax rates: Global tax database
- Size premiums: Duff & Phelps research

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPLv3) - see the [LICENSE](LICENSE) file for details.

The AGPLv3 license requires that if you modify and use this software on a server that users interact with (such as a SaaS application), you must make your modified source code available to users. This ensures that improvements to the software remain open and available to the community.
