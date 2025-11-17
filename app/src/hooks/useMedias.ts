/**
 * Custom hook for fetching and managing media data
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchMedias } from '../services/mediaService';
import type { IMedia } from '../types/media';

interface UseMediasResult {
  medias: IMedia[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook to fetch and manage media list
 */
export function useMedias(): UseMediasResult {
  const [medias, setMedias] = useState<IMedia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMedias();
      setMedias(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    medias,
    loading,
    error,
    refetch: fetchData,
  };
}
