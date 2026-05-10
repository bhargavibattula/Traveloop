export interface Trip {
  id: string;
  title: string;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface TripStop {
  id: string;
  trip_id: string;
  title: string;
  location?: string | null;
  notes?: string | null;
  stop_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface TripActivity {
  id: string;
  trip_id: string;
  stop_id?: string | null;
  title: string;
  description?: string | null;
  activity_date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  created_at?: string;
  updated_at?: string;
}
