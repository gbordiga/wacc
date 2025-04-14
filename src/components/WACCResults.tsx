"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalculationResult } from "@/types";
import { formatPercentage } from "@/utils/format";

interface WACCResultsProps {
  result: CalculationResult;
}

// Helper function to ensure values are numbers and to safely format them
function safeToFixed(
  value: number | string | undefined | null,
  decimals: number = 2
): string {
  if (value === undefined || value === null) return "0.00";

  // If it's already a number, use it
  if (typeof value === "number" && !isNaN(value)) {
    return value.toFixed(decimals);
  }

  // Try to convert string to number, handling comma as decimal separator
  const parsedValue = parseFloat(String(value).replace(",", "."));
  return isNaN(parsedValue) ? "0.00" : parsedValue.toFixed(decimals);
}

export default function WACCResults({ result }: WACCResultsProps) {
  const { wacc, costOfEquity, costOfDebt, inputs } = result;

  // Format the timestamp
  const formattedDate = new Date(result.timestamp).toLocaleString();

  // Ensure all values are numbers before calculations
  const safeInputs = {
    equityRatio: parseFloat(safeToFixed(inputs.equityRatio)),
    debtRatio: parseFloat(safeToFixed(inputs.debtRatio)),
    riskFreeRate: parseFloat(safeToFixed(inputs.riskFreeRate)),
    beta: parseFloat(safeToFixed(inputs.beta)),
    marketRiskPremium: parseFloat(safeToFixed(inputs.marketRiskPremium)),
    countryRiskPremium: parseFloat(safeToFixed(inputs.countryRiskPremium)),
    sizePremium: parseFloat(safeToFixed(inputs.sizePremium, 2)),
    additionalRisk: parseFloat(safeToFixed(inputs.additionalRisk, 2)),
    costOfDebt: parseFloat(safeToFixed(inputs.costOfDebt)),
    debtRiskFreeRate: parseFloat(safeToFixed(inputs.debtRiskFreeRate)),
    spreadRate: parseFloat(safeToFixed(inputs.spreadRate)),
    taxRate: parseFloat(safeToFixed(inputs.taxRate)),
    country: inputs.country,
    sector: inputs.sector,
  };

  const safeWacc = parseFloat(safeToFixed(wacc));
  const safeCostOfEquity = parseFloat(safeToFixed(costOfEquity));
  const safeCostOfDebt = parseFloat(safeToFixed(costOfDebt));

  // Convert percentage values to decimal ratios for calculations
  const equityRatioDecimal = safeInputs.equityRatio / 100;
  const debtRatioDecimal = safeInputs.debtRatio / 100;

  // Calculate individual components contribution using decimal ratios
  const equityContribution = equityRatioDecimal * safeCostOfEquity;
  const debtContribution =
    debtRatioDecimal * safeCostOfDebt * (1 - safeInputs.taxRate / 100);

  // Calculate Cost of Equity components
  const rfContribution = safeInputs.riskFreeRate;
  const betaMarketContribution = safeInputs.beta * safeInputs.marketRiskPremium;
  const sizePremiumContribution = safeInputs.sizePremium;
  const additionalRiskContribution = safeInputs.additionalRisk;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Results</h2>

      {/* Main Results Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* WACC Result */}
        <Card className="bg-primary/5 border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-center">WACC</CardTitle>
            <CardDescription className="text-center">
              Weighted Average Cost of Capital
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-primary">
              {formatPercentage(safeWacc / 100, 2)}
            </div>
          </CardContent>
        </Card>

        {/* Cost of Equity Result */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-center">
              Cost of Equity (k<sub>e</sub>)
            </CardTitle>
            <CardDescription className="text-center">
              Return required by shareholders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {formatPercentage(safeCostOfEquity / 100, 2)}
            </div>
          </CardContent>
        </Card>

        {/* Cost of Debt Result */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-center">
              Cost of Debt (k<sub>d</sub>)
            </CardTitle>
            <CardDescription className="text-center">
              Expected return by lenders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {formatPercentage(safeCostOfDebt / 100, 2)}
            </div>
            <div className="text-sm text-muted-foreground text-center mt-2">
              Tax effect: {formatPercentage(safeCostOfDebt/100*(- safeInputs.taxRate/100), 2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WACC Component Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>WACC Component Breakdown</CardTitle>
          <CardDescription>
            Relative contribution of each component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="w-full bg-muted h-6 rounded-full overflow-hidden flex">
              <div
                className="bg-blue-500 h-full flex items-center justify-center text-xs font-medium"
                style={{ width: `${(equityContribution / safeWacc) * 100}%` }}
              >
                {formatPercentage(equityContribution / safeWacc, 0)}
              </div>
              <div
                className="bg-green-500 h-full flex items-center justify-center text-xs font-medium"
                style={{ width: `${(debtContribution / safeWacc) * 100}%` }}
              >
                {formatPercentage(debtContribution / safeWacc, 0)}
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>
                  Equity: {formatPercentage(equityContribution / 100, 2)} (
                  {safeInputs.equityRatio.toFixed(0)}% of capital)
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>
                  Debt: {formatPercentage(debtContribution / 100, 2)} (
                  {safeInputs.debtRatio.toFixed(0)}% of capital)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculation Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Calculation Breakdown</CardTitle>
          <CardDescription>Details of the WACC calculation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* WACC Formula */}
            <div className="space-y-2">
              <h3 className="font-medium">WACC Formula</h3>
              <div className="p-3 bg-muted rounded-md">
                <p className="font-mono text-sm">
                  WACC = (E/(E+D)) × k<sub>e</sub> + (D/(E+D)) × k<sub>d</sub> ×
                  (1-T)
                </p>
                <p className="font-mono text-sm mt-2">
                  WACC = {safeToFixed(safeInputs.equityRatio)}% ÷ 100 ×{" "}
                  {safeToFixed(safeCostOfEquity)}% +{" "}
                  {safeToFixed(safeInputs.debtRatio)}% ÷ 100 ×{" "}
                  {safeToFixed(safeCostOfDebt)}% × (1-
                  {safeToFixed(safeInputs.taxRate)}%)
                </p>
                <p className="font-mono text-sm mt-2">
                  WACC = {safeToFixed(equityRatioDecimal * safeCostOfEquity)}% +{" "}
                  {safeToFixed(
                    debtRatioDecimal *
                      safeCostOfDebt *
                      (1 - safeInputs.taxRate / 100)
                  )}
                  %
                </p>
                <p className="font-mono text-sm mt-2 font-bold">
                  WACC = {safeToFixed(safeWacc)}%
                </p>
              </div>
            </div>

            {/* Cost of Equity Breakdown */}
            <div className="space-y-2">
              <h3 className="font-medium">
                Cost of Equity (k<sub>e</sub>) Breakdown
              </h3>

              {/* Ke component visualization */}
              <div className="w-full bg-muted h-6 rounded-full overflow-hidden flex mb-2">
                <div
                  className="bg-yellow-400 h-full flex items-center justify-center text-xs font-medium text-black"
                  style={{
                    width: `${(rfContribution / safeCostOfEquity) * 100}%`,
                  }}
                >
                  r<sub>f</sub>
                </div>
                <div
                  className="bg-orange-500 h-full flex items-center justify-center text-xs font-medium"
                  style={{
                    width: `${
                      (betaMarketContribution / safeCostOfEquity) * 100
                    }%`,
                  }}
                >
                  β×MRP
                </div>

                <div
                  className="bg-indigo-400 h-full flex items-center justify-center text-xs font-medium"
                  style={{
                    width: `${
                      (sizePremiumContribution / safeCostOfEquity) * 100
                    }%`,
                  }}
                >
                  SP
                </div>
                <div
                  className="bg-green-500 h-full flex items-center justify-center text-xs font-medium"
                  style={{
                    width: `${
                      (additionalRiskContribution / safeCostOfEquity) * 100
                    }%`,
                  }}
                >
                  α
                </div>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <p className="font-mono text-sm">
                  k<sub>e</sub> = r<sub>f</sub> + β × MRP + SP + AR
                </p>
                <p className="font-mono text-sm mt-2">
                  k<sub>e</sub> = {safeToFixed(safeInputs.riskFreeRate)}% +{" "}
                  {safeToFixed(safeInputs.beta)} ×{" "}
                  {safeToFixed(safeInputs.marketRiskPremium)}% +{" "}
                  {safeToFixed(safeInputs.sizePremium)}% +{" "}
                  {safeToFixed(safeInputs.additionalRisk)}%
                </p>
                <p className="font-mono text-sm mt-2">
                  k<sub>e</sub> = {safeToFixed(safeInputs.riskFreeRate)}% +{" "}
                  {safeToFixed(safeInputs.beta * safeInputs.marketRiskPremium)}%
                  + {safeToFixed(safeInputs.sizePremium)}% +{" "}
                  {safeToFixed(safeInputs.additionalRisk)}%
                </p>
                <p className="font-mono text-sm mt-2 font-bold">
                  k<sub>e</sub> = {safeToFixed(safeCostOfEquity)}%
                </p>
              </div>
            </div>

            {/* Cost of Debt Breakdown */}
            <div className="space-y-4">
              <h3 className="font-medium">
                Cost of Debt (k<sub>d</sub>) Breakdown
              </h3>

              {/* Cost of Debt Visualization */}
              <div className="w-full bg-muted h-6 rounded-full overflow-hidden flex mb-2">
                <div
                  className="bg-blue-500 h-full flex items-center justify-center text-xs font-medium"
                  style={{
                    width: `${
                      (safeInputs.debtRiskFreeRate / safeCostOfDebt) * 100
                    }%`,
                  }}
                >
                  r<sub>f</sub>
                </div>
                <div
                  className="bg-green-500 h-full flex items-center justify-center text-xs font-medium"
                  style={{
                    width: `${(safeInputs.spreadRate / safeCostOfDebt) * 100}%`,
                  }}
                >
                  Spread
                </div>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <p className="font-mono text-sm">
                  k<sub>d</sub> = r<sub>f</sub> + spread
                </p>
                <p className="font-mono text-sm mt-2">
                  k<sub>d</sub> = {safeToFixed(safeInputs.debtRiskFreeRate)}% +{" "}
                  {safeToFixed(safeInputs.spreadRate)}%
                </p>
                <p className="font-mono text-sm mt-2 font-bold">
                  k<sub>d</sub> = {safeToFixed(safeInputs.costOfDebt)}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-right">
        Calculation performed: {formattedDate}
      </div>
    </div>
  );
}
