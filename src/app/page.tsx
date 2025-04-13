import Calculator from "@/components/Calculator";

export const metadata = {
  title: "WACC Calculator",
  description:
    "Calculate the Weighted Average Cost of Capital for your company",
};

export default function CalculatorPage() {
  return (
    <div className="container mx-auto py-10  max-w-5xl w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          WACC Calculator
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Calculate the Weighted Average Cost of Capital (WACC)
        </p>
      </div>
      <Calculator />
    </div>
  );
}
