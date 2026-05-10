import { supabase } from "../lib/supabase";
import type { ChecklistItem } from "../types/checklist";

export async function addChecklistItem(
  tripId: string,
  item: Partial<ChecklistItem>,
): Promise<ChecklistItem> {
  const { data, error } = await supabase
    .from("checklist_items")
    .insert({ ...item, trip_id: tripId })
    .select()
    .single();

  if (error) {
    throw new Error(`[addChecklistItem] ${error.message}`);
  }

  if (!data) {
    throw new Error("[addChecklistItem] No data returned");
  }

  return data;
}

export async function updateChecklistItem(
  id: string,
  updates: Partial<ChecklistItem>,
): Promise<ChecklistItem> {
  const { data, error } = await supabase
    .from("checklist_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`[updateChecklistItem] ${error.message}`);
  }

  if (!data) {
    throw new Error("[updateChecklistItem] No data returned");
  }

  return data;
}

export async function deleteChecklistItem(id: string): Promise<void> {
  const { error } = await supabase.from("checklist_items").delete().eq("id", id);

  if (error) {
    throw new Error(`[deleteChecklistItem] ${error.message}`);
  }
}

export async function toggleChecklistItem(
  id: string,
  completed: boolean,
): Promise<ChecklistItem> {
  return updateChecklistItem(id, { completed });
}
