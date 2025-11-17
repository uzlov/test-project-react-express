import ENV from '@src/common/constants/ENV';
import { IMedia } from '@src/models/Media';
import MediaRepo from '@src/repos/MediaRepo';

/**
 * Build complete media route URL
 */
function buildMediaRoute(media: IMedia): string {
  return `${ENV.MediarouteBaseUrl}${media.filedata.filename}`;
}

/**
 * Build complete thumbnail route URL
 */
function buildThumbnailRoute(media: IMedia): string {
  return `${ENV.ThumbnailrouteBaseUrl}${media.thumbnail.filename}`;
}

/**
 * Populate media object with full URLs
 */
function populateMediaRoutes(media: IMedia): IMedia {
  return {
    ...media,
    mediaroute: buildMediaRoute(media),
    thumbnail: {
      ...media.thumbnail,
      thumbnailroute: buildThumbnailRoute(media),
    },
  };
}

/**
 * Get all medias.
 */
async function getAll(): Promise<IMedia[]> {
  const medias = await MediaRepo.getAll();
  return medias.map(populateMediaRoutes);
}

/**
 * Add one media.
 */
function addOne(media: IMedia): Promise<void> {
  return MediaRepo.addOne(media);
}

export default {
  getAll,
  addOne,
} as const;