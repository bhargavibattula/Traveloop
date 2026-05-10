"use client";

import { useCallback, useState } from "react";
import {
  createTrip as createTripService,
  deleteTrip as deleteTripService,
  updateTrip as updateTripService,
} from "../services/trip.service";
import type { Trip } from "../types/trip";

type CreateTripData = Parameters<typeof createTripService>[0];
type UpdateTripData = Parameters<typeof updateTripService>[1];

type UseCreateTripResult = {
  createTrip: (data: CreateTripData) => Promise<Trip>;
  loading: boolean;
  error: string | null;
};

type UseUpdateTripResult = {
  updateTrip: (id: string, data: UpdateTripData) => Promise<Trip>;
  loading: boolean;
  error: string | null;
};

type UseDeleteTripResult = {
  deleteTrip: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unexpected error occurred";
}

export function useCreateTrip(): UseCreateTripResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTrip = useCallback(async (data: CreateTripData): Promise<Trip> => {
    setLoading(true);
    setError(null);

    try {
      const trip = await createTripService(data);
      setError(null);
      return trip;
    } catch (mutationError) {
      const message = getErrorMessage(mutationError);
      setError(message);
      throw mutationError;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createTrip, loading, error };
}

export function useUpdateTrip(): UseUpdateTripResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTrip = useCallback(
    async (id: string, data: UpdateTripData): Promise<Trip> => {
      setLoading(true);
      setError(null);

      try {
        const trip = await updateTripService(id, data);
        setError(null);
        return trip;
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

  return { updateTrip, loading, error };
}

export function useDeleteTrip(): UseDeleteTripResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTrip = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await deleteTripService(id);
      setError(null);
    } catch (mutationError) {
      const message = getErrorMessage(mutationError);
      setError(message);
      throw mutationError;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteTrip, loading, error };
}
