import { supabase } from "../lib/supabase";

export type Activity = {
  id: string;
  stop_id: string;
  title: string;
  category: string;
  cost: number;
  duration: string;
  notes: string;
  position: number;
};

export type CreateActivityInput = {
  stop_id: string;
  title: string;
  category?: string;
  cost?: number;
  duration?: string;
  notes?: string;
  position: number;
};

export async function addActivity(inputData: CreateActivityInput): Promise<Activity> {
  const { data, error } = await supabase
    .from("trip_activities")
    .insert(inputData)
    .select()
    .single();

  if (error) {
    throw new Error(`[addActivity] ${error.message}`);
  }

  if (!data) {
    throw new Error("[addActivity] No data returned");
  }

  return data;
}

export async function updateActivity(
  id: string,
  updateData: Partial<CreateActivityInput>,
): Promise<Activity> {
  const { data, error } = await supabase
    .from("trip_activities")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`[updateActivity] ${error.message}`);
  }

  if (!data) {
    throw new Error("[updateActivity] No data returned");
  }

  return data;
}

export async function removeActivity(id: string): Promise<void> {
  const { error } = await supabase.from("trip_activities").delete().eq("id", id);

  if (error) {
    throw new Error(`[removeActivity] ${error.message}`);
  }
}
