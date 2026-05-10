export type TripActivity = {
  id?: string;
  stop_id?: string;
  title?: string;
  category?: string | null;
  cost?: number | null;
  duration?: string | null;
  notes?: string | null;
  position?: number | null;
};

export type CategoryTotals = Record<string, number>;
