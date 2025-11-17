/**
 * TypeScript interfaces for Media data structure
 */

export interface IFileData {
  bitrate: number;
  fileSize: number;
  filename: string;
}

export interface IThumbnail {
  id: string;
  name: string;
  filename: string;
  thumbnailroute?: string;
}

export interface IMedia {
  id: string;
  title: string;
  description: string;
  duration: number;
  tags: string;
  filedata: IFileData;
  thumbnail: IThumbnail;
  mediaroute?: string;
}

export interface IMediaResponse {
  medias: IMedia[];
}

/**
 * Helper to format duration from seconds to MM:SS
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Helper to get thumbnail URL with fallback
 */
export function getThumbnailUrl(media: IMedia): string {
  return media.thumbnail.thumbnailroute || '';
}

/**
 * Helper to parse tags string into array
 */
export function parseTags(tags: string): string[] {
  return tags.split(',').map(tag => tag.trim()).filter(Boolean);
}
