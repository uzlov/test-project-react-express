/**
 * Main App Component - Media Player Application
 */

import { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MediaPlayer } from './components/MediaPlayer';
import { MediaInfo } from './components/MediaInfo';
import { MediaList } from './components/MediaList';
import { ErrorMessage } from './components/ErrorMessage';
import { useMedias } from './hooks/useMedias';
import type { IMedia } from './types/media';

function App() {
  const [selectedMedia, setSelectedMedia] = useState<IMedia | null>(null);
  const { medias, loading, error, refetch } = useMedias();

  const handleMediaSelect = (media: IMedia) => {
    setSelectedMedia(media);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Header */}
        <header className="bg-slate-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">Media Player</h1>
            <p className="text-slate-400 mt-1">
              Select a media to start playing
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Error State */}
          {error && (
            <ErrorMessage error={error} onRetry={refetch} />
          )}

          {/* Media Player Section */}
          {!error && (
            <>
              <section className="md:px-20 lg:px-20 space-y-4">
                <MediaPlayer
                  mediaUrl={selectedMedia?.mediaroute}
                  thumbnailUrl={selectedMedia?.thumbnail?.thumbnailroute}
                  isLoading={loading && !selectedMedia}
                />
                <MediaInfo media={selectedMedia} />
              </section>

              {/* Divider */}
              <div className="border-t border-slate-700"></div>

              {/* Media List Section */}
              <section>
                <h2 className="text-xl font-semibold mb-4 px-2">
                  Available Media ({medias.length})
                </h2>
                <MediaList
                  medias={medias}
                  selectedMediaId={selectedMedia?.id || null}
                  onMediaSelect={handleMediaSelect}
                  isLoading={loading}
                />
              </section>
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-slate-800 mt-12 border-t border-slate-700">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
            <p>&copy; 2025 Media Player. Built with React + TypeScript + Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
