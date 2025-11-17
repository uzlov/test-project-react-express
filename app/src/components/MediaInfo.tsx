/**
 * MediaInfo component - Displays selected media information
 */

import type { IMedia } from '../types/media';
import { formatDuration, parseTags } from '../types/media';
import { ClockIcon, FilmIcon, DocumentIcon } from './icons';

interface MediaInfoProps {
  media: IMedia | null;
}

export function MediaInfo({ media }: MediaInfoProps) {
  if (!media) {
    return (
      <div className="w-full py-2 text-center">
        <p className="text-slate-500 text-sm">
          Select a media to view details
        </p>
      </div>
    );
  }

  const tags = parseTags(media.tags);

  return (
    <div className="w-full py-6 space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          {media.title}
        </h2>
      </div>

      {/* Metadata Row */}
      <div className="flex items-center gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <span>{formatDuration(media.duration)}</span>
        </div>

        <div className="flex items-center gap-2">
          <FilmIcon className="h-4 w-4" />
          <span>{media.filedata.bitrate} kbps</span>
        </div>

        <div className="flex items-center gap-2">
          <DocumentIcon className="h-4 w-4" />
          <span>{(media.filedata.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
        </div>
      </div>

      {/* Description */}
      {media.description && (
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-2">Description</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {media.description}
          </p>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-300">Tags</span>
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}