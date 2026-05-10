export function getBudgetRecommendations(budget: number): string[] {
  if (budget <= 10000) {
    return ["Use hostels instead of hotels", "Prefer local transport"];
  }

  if (budget >= 50000) {
    return ["Luxury stays recommended", "Private transport available"];
  }

  return ["Mix budget stays with selected experiences", "Book transport early"];
}

export function getTravelStyleRecommendations(travelStyle: string): string[] {
  const normalizedTravelStyle = travelStyle.trim().toLowerCase();

  if (normalizedTravelStyle === "adventure") {
    return ["Trekking", "Camping", "Water sports"];
  }

  if (normalizedTravelStyle === "relaxation") {
    return ["Beach resorts", "Spa experiences"];
  }

  if (normalizedTravelStyle === "family") {
    return ["Theme parks", "Family resorts"];
  }

  return ["City walks", "Local sightseeing"];
}

export function getActivityRecommendations(category: string): string[] {
  const normalizedCategory = category.trim().toLowerCase();

  if (normalizedCategory === "food") {
    return ["Street food tour", "Local cuisine tasting"];
  }

  if (normalizedCategory === "nature") {
    return ["National parks", "Sunrise viewpoints"];
  }

  return ["Popular local experiences", "Guided city highlights"];
}
