import { IMedia } from '@src/models/Media';

import orm from './MockOrm';
import { UUID } from 'crypto';

/**
 * Get one media by id.
 */
async function getOne(id: UUID): Promise<IMedia | null> {
  const db = await orm.openDb();
  for (const media of db.medias) {
    if (media.id === id) {
      return media;
    }
  }
  return null;
}

/**
 * Get all medias.
 */
async function getAll(): Promise<IMedia[]> {
  const db = await orm.openDb();
  return db.medias;
}

/**
 * Add one media.
 */
async function addOne(media: IMedia): Promise<void> {
  const db = await orm.openDb();
  media.id = crypto.randomUUID();
  db.medias.push(media);
  return orm.saveDb(db);
}

/**
 * For testing purposes.
 * Add muliply medias.
 */
async function addMuliply(medias: IMedia[]): Promise<void> {
  const db = await orm.openDb();
  if (!db.medias) {
    db.medias = [];
  }
  for (const media of medias) {
    media.id = crypto.randomUUID();
    db.medias.push(media);
  }
  return orm.saveDb(db);
} 

export default {
  getOne,
  getAll,
  addOne,
  addMuliply,
} as const;
