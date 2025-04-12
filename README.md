# WACC Calculator

A modern web application for calculating the Weighted Average Cost of Capital (WACC) based on industry-standard financial models and data sources.

## Features

- **Industry Data Integration**: Uses Damodaran and Fernandez data for accurate financial calculations
- **Comprehensive Parameters**: Includes all critical WACC components:
  - Cost of Equity (CAPM model with size premium)
  - Cost of Debt (based on risk-free rate and spreads)
  - Capital Structure (equity/debt ratios)
  - Tax Effects (country-specific marginal tax rates)
- **Size Premium Analysis**: Calculates size premiums based on market capitalization
- **Debt Rating**: Estimates debt spreads from Interest Coverage Ratio (ICR)
- **Country & Sector Specific**: Tailored calculations based on geographic regions and industry sectors
- **Visualized Results**: Clear breakdown of all components and calculations

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
