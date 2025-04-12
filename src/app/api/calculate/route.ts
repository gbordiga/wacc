import { NextRequest, NextResponse } from "next/server";
import { calculateCostOfEquity, calculateWACC } from "@/lib/financial";
import { WACCInputs, CalculationResult } from "@/types";

/**
 * POST /api/calculate
 * Calculates WACC and Cost of Equity based on provided inputs
 */
export async function POST(req: NextRequest) {
  try {
    const inputs = (await req.json()) as WACCInputs;

    // Validate inputs
    const requiredFields = [
      "equityRatio",
      "debtRatio",
      "riskFreeRate",
      "beta",
      "marketRiskPremium",
      "countryRiskPremium",
      "additionalRisk",
      "sizePremium",
      "costOfDebt",
      "taxRate",
    ];

    const missingFields = requiredFields.filter(
      (field) => inputs[field as keyof WACCInputs] === undefined
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Calculate Cost of Equity
    const costOfEquity = calculateCostOfEquity({
      riskFreeRate: inputs.riskFreeRate,
      beta: inputs.beta,
      marketRiskPremium: inputs.marketRiskPremium,
      countryRiskPremium: inputs.countryRiskPremium,
      sizePremium: inputs.sizePremium,
      additionalRisk: inputs.additionalRisk,
    });

    // Calculate WACC
    const wacc = calculateWACC({
      riskFreeRate: inputs.riskFreeRate,
      beta: inputs.beta,
      marketRiskPremium: inputs.marketRiskPremium,
      countryRiskPremium: inputs.countryRiskPremium,
      sizePremium: inputs.sizePremium,
      additionalRisk: inputs.additionalRisk,
      equityRatio: inputs.equityRatio,
      debtRatio: inputs.debtRatio,
      costOfDebt: inputs.costOfDebt,
      taxRate: inputs.taxRate,
    });

    // Prepare the result
    const result: CalculationResult = {
      costOfEquity,
      costOfDebt: inputs.costOfDebt,
      wacc,
      inputs,
      timestamp: new Date(),
    };

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Error in calculate API:", error);
    return NextResponse.json(
      {
        error: `Failed to calculate WACC: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
