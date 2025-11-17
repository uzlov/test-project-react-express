/**
 * MediaPlayer component - Displays media in an iframe
 */

import { buildPlayerUrl } from '../services/mediaService';
import { PlayCircleIcon } from './icons';

interface MediaPlayerProps {
  mediaUrl?: string;
  thumbnailUrl?: string;
  isLoading?: boolean;
}

export function MediaPlayer({ mediaUrl, thumbnailUrl, isLoading }: MediaPlayerProps) {
  if (isLoading) {
    return (
      <div className="w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!mediaUrl) {
    return (
      <div className="w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <PlayCircleIcon className="mx-auto h-16 w-16 text-slate-600" />
          <p className="mt-4 text-slate-400 text-lg">
            Select a media to start playing
          </p>
        </div>
      </div>
    );
  }

  const playerUrl = buildPlayerUrl(mediaUrl, thumbnailUrl);

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
      <iframe
        src={playerUrl}
        className="w-full h-full"
        title="Media Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
