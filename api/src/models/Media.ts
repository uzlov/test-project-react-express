import { isString, isOptionalString, isNumber } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';
import { UUID } from 'crypto';

import {
  isUUID,
  isFileData,
  isThumbnail,
} from '@src/common/util/validators';
import { IModelUUID } from './common/types';

const DEFAULT_MEDIAS_VALS = (): IMedia => ({
  id: '00000000-0000-0000-0000-000000000000',
  title: '',
  description: '',
  duration: 0,
  tags: '',
  filedata: {
    bitrate: 0,
    fileSize: 0,
    filename: '',
  },
  thumbnail: {
    id: '00000000-0000-0000-0000-000000000000',
    name: '',
    filename: '',
    thumbnailroute: '',
  },
  mediaroute: '',
});

export interface IMedia extends IModelUUID {
  title: string;
  description: string;
  duration: number;
  tags: string;
  filedata: {
    bitrate: number;
    fileSize: number;
    filename: string;
  };
  thumbnail: {
    id: UUID;
    name: string;
    filename: string;
    thumbnailroute?: string;
  };
  mediaroute?: string;
}

// Initialize the "parseMedia" function
const parseMedia = parseObject<IMedia>({
  id: isUUID,
  title: isString,
  description: isString,
  duration: isNumber,
  tags: isString,
  filedata: isFileData,
  thumbnail: isThumbnail,
  mediaroute: isOptionalString,
});

/**
 * New media object.
 */
function __new__(medias?: Partial<IMedia>): IMedia {
  const retVal = { ...DEFAULT_MEDIAS_VALS(), ...medias };
  return parseMedia(retVal, errors => {
    throw new Error(
      'Setup new medias failed ' + JSON.stringify(errors, null, 2),
    );
  });
}

/**
 * Check is a media object. For the route validation.
 */
function test(arg: unknown, errCb?: TParseOnError): arg is IMedia {
  return !!parseMedia(arg, errCb);
}

export default {
  new: __new__,
  test,
} as const;