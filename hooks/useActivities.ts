"use client";

import { useCallback, useState } from "react";
import {
  addActivity as addActivityService,
  removeActivity as removeActivityService,
  updateActivity as updateActivityService,
} from "../services/activity.service";

type Activity = Awaited<ReturnType<typeof addActivityService>>;
type AddActivityData = Parameters<typeof addActivityService>[0];
type UpdateActivityData = Parameters<typeof updateActivityService>[1];

type UseActivityMutationsResult = {
  addActivity: (data: AddActivityData) => Promise<Activity>;
  updateActivity: (id: string, data: UpdateActivityData) => Promise<Activity>;
  removeActivity: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unexpected error occurred";
}

export function useActivityMutations(): UseActivityMutationsResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addActivity = useCallback(
    async (data: AddActivityData): Promise<Activity> => {
      setLoading(true);
      setError(null);

      try {
        const activity = await addActivityService(data);
        setError(null);
        return activity;
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

  const updateActivity = useCallback(
    async (id: string, data: UpdateActivityData): Promise<Activity> => {
      setLoading(true);
      setError(null);

      try {
        const activity = await updateActivityService(id, data);
        setError(null);
        return activity;
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

  const removeActivity = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await removeActivityService(id);
      setError(null);
    } catch (mutationError) {
      const message = getErrorMessage(mutationError);
      setError(message);
      throw mutationError;
    } finally {
      setLoading(false);
    }
  }, []);

  return { addActivity, updateActivity, removeActivity, loading, error };
}
