import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import MediaService from '@src/services/MediaService';
import Media from '@src/models/Media';

import { IReq, IRes } from './common/types';
import { parseReq } from './common/util';

const Validators = {
  addOne: parseReq({ media: Media.test }),
} as const;

/**
 * Get all medias.
 */
async function getAll(_: IReq, res: IRes) {
  const medias = await MediaService.getAll();
  res.status(HttpStatusCodes.OK).json({ medias });
}

/**
 * Add one media.
 */
async function addOne(req: IReq, res: IRes) {
  const { media } = Validators.addOne(req.body);
  await MediaService.addOne(media);
  res.status(HttpStatusCodes.CREATED).end();
}

export default {
  getAll,
  addOne,
} as const;
