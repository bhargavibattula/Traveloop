import { supabase } from "../lib/supabase";
import type { Trip } from "../types/trip";

export type CreateTripInput = {
  user_id: string;
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  travel_style?: string;
};

export async function createTrip(inputData: CreateTripInput): Promise<Trip> {
  const { data, error } = await supabase
    .from("trips")
    .insert(inputData)
    .select()
    .single();

  if (error) {
    throw new Error(`[createTrip] ${error.message}`);
  }

  if (!data) {
    throw new Error("[createTrip] No data returned");
  }

  return data;
}

export async function getTrips(userId: string): Promise<Trip[]> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`[getTrips] ${error.message}`);
  }

  if (!data) {
    throw new Error("[getTrips] No data returned");
  }

  return data;
}

export async function getTripById(id: string): Promise<Trip> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`[getTripById] ${error.message}`);
  }

  if (!data) {
    throw new Error("[getTripById] No data returned");
  }

  return data;
}

export async function updateTrip(
  id: string,
  updateData: Partial<CreateTripInput>,
): Promise<Trip> {
  const { data, error } = await supabase
    .from("trips")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`[updateTrip] ${error.message}`);
  }

  if (!data) {
    throw new Error("[updateTrip] No data returned");
  }

  return data;
}

export async function deleteTrip(id: string): Promise<void> {
  const { error } = await supabase.from("trips").delete().eq("id", id);

  if (error) {
    throw new Error(`[deleteTrip] ${error.message}`);
  }
}
