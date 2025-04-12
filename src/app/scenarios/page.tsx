import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "WACC Scenarios",
  description: "Compare different WACC calculation scenarios",
};

export default function ScenariosPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            WACC Scenarios
          </h1>
          <p className="text-muted-foreground">
            Compare different cost of capital scenarios for your business.
          </p>
        </div>
        <Link href="/calculator">
          <Button className="mt-4 md:mt-0">Create New Scenario</Button>
        </Link>
      </div>

      {/* Empty state */}
      <Card className="border-dashed border-2 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-xl">No Saved Scenarios</CardTitle>
          <CardDescription>
            You haven&apos;t saved any WACC calculation scenarios yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Create and save different scenarios to compare how changes in
            capital structure, beta, or other parameters affect your
            company&apos;s WACC.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-background rounded-md border">
              <h3 className="font-medium mb-2">Compare Capital Structure</h3>
              <p className="text-muted-foreground">
                See how different debt-to-equity ratios affect your WACC.
              </p>
            </div>

            <div className="p-4 bg-background rounded-md border">
              <h3 className="font-medium mb-2">Analyze Risk Factors</h3>
              <p className="text-muted-foreground">
                Compare scenarios with different betas or country risk premiums.
              </p>
            </div>

            <div className="p-4 bg-background rounded-md border">
              <h3 className="font-medium mb-2">Optimize for Tax Benefits</h3>
              <p className="text-muted-foreground">
                Find the optimal capital structure considering tax shield
                benefits.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/calculator" className="w-full">
            <Button className="w-full">Start Your First Scenario</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
