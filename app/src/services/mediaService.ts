/**
 * API service layer for fetching media data
 */

import { env } from '../config/env';
import type { IMedia, IMediaResponse } from '../types/media';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode?: number;
  originalError?: Error;

  constructor(
    message: string,
    statusCode?: number,
    originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

/**
 * Fetch all medias from the API
 * @throws {ApiError} When the request fails
 */
export async function fetchMedias(): Promise<IMedia[]> {
  const url = `${env.apiBaseUrl}/getmedias`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch medias: ${response.statusText}`,
        response.status
      );
    }

    const data: IMediaResponse = await response.json();

    if (!data.medias || !Array.isArray(data.medias)) {
      throw new ApiError('Invalid response format: medias array not found');
    }

    return data.medias;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ApiError(
        `Network error: ${error.message}`,
        undefined,
        error
      );
    }

    throw new ApiError('Unknown error occurred while fetching medias');
  }
}

/**
 * Build iframe player URL with media route
 */
export function buildPlayerUrl(mediaRoute: string, thumbnailUrl: string | undefined): string {
  return `${env.iframePlayerUrl}?injectSrc=${encodeURIComponent(mediaRoute)}&miniature=${thumbnailUrl ? encodeURIComponent(thumbnailUrl) : ''}`;
}

export default {
  fetchMedias,
  buildPlayerUrl,
};
