import type { CategoryTotals, TripActivity } from "../types/budget";

export function calculateTripBudget(activities: TripActivity[]): number {
  return activities.reduce((total, activity) => {
    return total + (activity.cost ?? 0);
  }, 0);
}

export function calculateCategoryTotals(
  activities: TripActivity[],
): CategoryTotals {
  return activities.reduce<CategoryTotals>((totals, activity) => {
    const category = activity.category ?? "Uncategorized";
    const cost = activity.cost ?? 0;

    totals[category] = (totals[category] ?? 0) + cost;

    return totals;
  }, {});
}

export function calculateRemainingBudget(
  totalBudget: number,
  spent: number,
): number {
  return totalBudget - spent;
}

export function generateBudgetWarnings(
  totalBudget: number,
  spent: number,
  categoryTotals: CategoryTotals,
): string[] {
  const warnings: string[] = [];

  if (spent > totalBudget) {
    warnings.push("Trip is over budget");
  }

  if (totalBudget > 0 && spent / totalBudget >= 0.9) {
    warnings.push("Budget usage exceeds 90%");
  }

  const foodTotal = categoryTotals.Food ?? categoryTotals.food ?? 0;

  if (totalBudget > 0 && foodTotal / totalBudget >= 0.3) {
    warnings.push("Food expenses are unusually high");
  }

  const travelTotal = categoryTotals.Travel ?? categoryTotals.travel ?? 0;

  if (totalBudget > 0 && travelTotal / totalBudget > 0.5) {
    warnings.push("Travel costs exceed 50% of budget");
  }

  return warnings;
}
