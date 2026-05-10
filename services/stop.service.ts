import { supabase } from "../lib/supabase";
import type { TripStop } from "../types/trip";

export type CreateStopInput = {
  trip_id: string;
  city: string;
  country: string;
  start_date?: string;
  end_date?: string;
  position: number;
};

export async function addStop(inputData: CreateStopInput): Promise<TripStop> {
  const { data, error } = await supabase
    .from("trip_stops")
    .insert(inputData)
    .select()
    .single();

  if (error) {
    throw new Error(`[addStop] ${error.message}`);
  }

  if (!data) {
    throw new Error("[addStop] No data returned");
  }

  return data;
}

export async function deleteStop(id: string): Promise<void> {
  const { error } = await supabase.from("trip_stops").delete().eq("id", id);

  if (error) {
    throw new Error(`[deleteStop] ${error.message}`);
  }
}

export async function reorderStops(
  stopId: string,
  newPosition: number,
): Promise<TripStop> {
  const { data, error } = await supabase
    .from("trip_stops")
    .update({ position: newPosition })
    .eq("id", stopId)
    .select()
    .single();

  if (error) {
    throw new Error(`[reorderStops] ${error.message}`);
  }

  if (!data) {
    throw new Error("[reorderStops] No data returned");
  }

  return data;
}
