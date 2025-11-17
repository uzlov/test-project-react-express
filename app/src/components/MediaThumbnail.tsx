/**
 * MediaThumbnail component - Individual media item with thumbnail
 */

import type { IMedia } from '../types/media';
import { formatDuration, getThumbnailUrl } from '../types/media';
import { PlayCircleIcon, CheckCircleIcon } from './icons';

interface MediaThumbnailProps {
  media: IMedia;
  isSelected: boolean;
  onClick: (media: IMedia) => void;
}

export function MediaThumbnail({ media, isSelected, onClick }: MediaThumbnailProps) {
  const thumbnailUrl = getThumbnailUrl(media);

  return (
    <div
      onClick={() => onClick(media)}
      className={`
        relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200
        ${isSelected 
          ? 'ring-4 ring-blue-500 scale-105 shadow-2xl' 
          : 'hover:scale-105 hover:shadow-xl shadow-md'
        }
      `}
    >
      {/* Thumbnail Image */}
      <div className="aspect-video bg-slate-700 relative">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={media.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback for broken images
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PlayCircleIcon className="h-12 w-12 text-slate-500" />
          </div>
        )}
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {formatDuration(media.duration)}
        </div>
      </div>

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
        <h3 className="text-white text-sm font-medium line-clamp-2">
          {media.title}
        </h3>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <CheckCircleIcon className="h-3 w-3" />
          <span>Playing</span>
        </div>
      )}
    </div>
  );
}
