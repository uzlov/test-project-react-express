import {
  isNumber,
  isDate,
  isObject,
  isString,
  isOptionalString,
} from 'jet-validators';
import { transform } from 'jet-validators/utils';
import { UUID } from 'crypto';

import { IMedia } from '@src/models/Media';

/**
 * Database relational key.
 */
export function isRelationalKey(arg: unknown): arg is number {
  return isNumber(arg) && arg >= -1;
}

/**
 * Convert to date object then check is a validate date.
 */
export const transIsDate = transform(
  arg => new Date(arg as string),
  arg => isDate(arg),
);

/**
* Check if the value is a valid filedata nested object.
*/
export const isFileData = (arg: unknown): arg is IMedia['filedata'] => {
  if (!isObject(arg)) return false;
  
  const obj = arg as IMedia['filedata'];
  return (
    isNumber(obj.bitrate) &&
    isNumber(obj.fileSize) &&
    isString(obj.filename)
  );
};

/**
* Check if the value is a valid thumbnail nested object.
*/
export const isThumbnail = (arg: unknown): arg is IMedia['thumbnail'] => {
  if (!isObject(arg)) return false;
  
  const obj = arg as IMedia['thumbnail'];
  return (
    isUUID(obj.id) &&
    isString(obj.name) &&
    isString(obj.filename) &&
    isOptionalString(obj.thumbnailroute)
  );
};

/**
* Check if the value is a valid UUID string.
*/
export function isUUID(arg: unknown): arg is UUID {
  if (!isString(arg)) return false;
 
  // UUID regex pattern: 8-4-4-4-12 hex characters
  // eslint-disable-next-line max-len
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(arg);
}
