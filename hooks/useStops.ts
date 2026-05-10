"use client";

import { useCallback, useState } from "react";
import {
  addStop as addStopService,
  deleteStop as deleteStopService,
  reorderStops as reorderStopsService,
} from "../services/stop.service";
import type { TripStop } from "../types/trip";

type AddStopData = Parameters<typeof addStopService>[0];

type UseStopMutationsResult = {
  addStop: (data: AddStopData) => Promise<TripStop>;
  deleteStop: (id: string) => Promise<void>;
  reorderStops: (stopId: string, newPosition: number) => Promise<TripStop>;
  loading: boolean;
  error: string | null;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unexpected error occurred";
}

export function useStopMutations(): UseStopMutationsResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addStop = useCallback(async (data: AddStopData): Promise<TripStop> => {
    setLoading(true);
    setError(null);

    try {
      const stop = await addStopService(data);
      setError(null);
      return stop;
    } catch (mutationError) {
      const message = getErrorMessage(mutationError);
      setError(message);
      throw mutationError;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteStop = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await deleteStopService(id);
      setError(null);
    } catch (mutationError) {
      const message = getErrorMessage(mutationError);
      setError(message);
      throw mutationError;
    } finally {
      setLoading(false);
    }
  }, []);

  const reorderStops = useCallback(
    async (stopId: string, newPosition: number): Promise<TripStop> => {
      setLoading(true);
      setError(null);

      try {
        const stop = await reorderStopsService(stopId, newPosition);
        setError(null);
        return stop;
      } catch (mutationError) {
        const message = getErrorMessage(mutationError);
        setError(message);
        throw mutationError;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { addStop, deleteStop, reorderStops, loading, error };
}
