/**
 * MediaList component - Horizontal scrollable list of media thumbnails
 */

import type { IMedia } from '../types/media';
import { MediaThumbnail } from './MediaThumbnail';
import { FilmIcon } from './icons';

interface MediaListProps {
  medias: IMedia[];
  selectedMediaId: string | null;
  onMediaSelect: (media: IMedia) => void;
  isLoading?: boolean;
}

export function MediaList({ medias, selectedMediaId, onMediaSelect, isLoading }: MediaListProps) {
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-video bg-slate-700 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (medias.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <FilmIcon className="mx-auto h-12 w-12 text-slate-600" />
        <p className="mt-4 text-slate-400">No media available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto p-3 pb-4">
        {medias.map((media) => (
          <MediaThumbnail
            key={media.id}
            media={media}
            isSelected={media.id === selectedMediaId}
            onClick={onMediaSelect}
          />
        ))}
      </div>
    </div>
  );
}
