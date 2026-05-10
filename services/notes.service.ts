import { supabase } from "../lib/supabase";
import type { Note } from "../types/note";

export async function addNote(
  tripId: string,
  note: Partial<Note>,
): Promise<Note> {
  const { data, error } = await supabase
    .from("notes")
    .insert({ ...note, trip_id: tripId })
    .select()
    .single();

  if (error) {
    throw new Error(`[addNote] ${error.message}`);
  }

  if (!data) {
    throw new Error("[addNote] No data returned");
  }

  return data;
}

export async function updateNote(id: string, content: string): Promise<Note> {
  const { data, error } = await supabase
    .from("notes")
    .update({ content })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`[updateNote] ${error.message}`);
  }

  if (!data) {
    throw new Error("[updateNote] No data returned");
  }

  return data;
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    throw new Error(`[deleteNote] ${error.message}`);
  }
}

export async function getNotesByTrip(tripId: string): Promise<Note[]> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("trip_id", tripId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`[getNotesByTrip] ${error.message}`);
  }

  return data || [];
}
