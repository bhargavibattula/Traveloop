"use client";

import { useCallback, useEffect, useState } from "react";
import { getTripById, getTrips } from "../services/trip.service";
import type { Trip } from "../types/trip";

type UseTripsResult = {
  trips: Trip[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

type UseTripByIdResult = {
  trip: Trip | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unexpected error occurred";
}

export function useTrips(userId = ""): UseTripsResult {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refetch = useCallback(() => {
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function fetchTrips(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        const fetchedTrips = await getTrips(userId);

        if (mounted) {
          setTrips(fetchedTrips);
          setError(null);
        }
      } catch (fetchError) {
        if (mounted) {
          setError(getErrorMessage(fetchError));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void fetchTrips();

    return () => {
      mounted = false;
    };
  }, [refreshKey, userId]);

  return { trips, loading, error, refetch };
}

export function useTripById(id: string): UseTripByIdResult {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(Boolean(id.trim()));
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refetch = useCallback(() => {
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    let mounted = true;
    const tripId = id.trim();

    if (!tripId) {
      setTrip(null);
      setLoading(false);
      setError(null);
      return () => {
        mounted = false;
      };
    }

    async function fetchTrip(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        const fetchedTrip = await getTripById(tripId);

        if (mounted) {
          setTrip(fetchedTrip);
          setError(null);
        }
      } catch (fetchError) {
        if (mounted) {
          setError(getErrorMessage(fetchError));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void fetchTrip();

    return () => {
      mounted = false;
    };
  }, [id, refreshKey]);

  return { trip, loading, error, refetch };
}
