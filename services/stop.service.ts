import { supabase } from "../lib/supabase";
import type { TripStop } from "../types/trip";

export type Stop = TripStop & {
  city?: string;
  country?: string;
  position?: number;
};

export type CreateStopInput = {
  trip_id: string;
  city: string;
  country: string;
  start_date?: string;
  end_date?: string;
  position: number;
};

export async function fetchStopsByTrip(tripId: string): Promise<Stop[]> {
  const { data, error } = await supabase
    .from("trip_stops")
    .select("*")
    .eq("trip_id", tripId)
    .order("position", { ascending: true });

  if (error) {
    throw new Error(`[fetchStopsByTrip] ${error.message}`);
  }

  return data || [];
}

export async function addStop(
  tripIdOrInputData: string | CreateStopInput,
  stop?: Partial<Stop>,
): Promise<Stop> {
  const inputData =
    typeof tripIdOrInputData === "string"
      ? { ...stop, trip_id: tripIdOrInputData }
      : tripIdOrInputData;

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
  stopsOrStopId: { id: string; position: number }[] | string,
  newPosition?: number,
): Promise<Stop[] | Stop> {
  if (typeof stopsOrStopId === "string") {
    const { data, error } = await supabase
      .from("trip_stops")
      .update({ position: newPosition })
      .eq("id", stopsOrStopId)
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

  const updatedStops = await Promise.all(
    stopsOrStopId.map(async (stop) => {
      const { data, error } = await supabase
        .from("trip_stops")
        .update({ position: stop.position })
        .eq("id", stop.id)
        .select()
        .single();

      if (error) {
        throw new Error(`[reorderStops] ${error.message}`);
      }

      if (!data) {
        throw new Error("[reorderStops] No data returned");
      }

      return data;
    }),
  );

  return updatedStops;
}
