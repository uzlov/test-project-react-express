import Media, { IMedia } from '@src/models/Media';
import MediaRepo from '@src/repos/MediaRepo';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { ValidationError } from '@src/common/util/route-errors';

import Paths from './common/Paths';
import { parseValidationErr, TRes } from './common/util';
import { agent } from './support/setup';

// Simple test just FOR DEMO!

// Dummy medias for GET/POST req
const MEDIAS = [
  {
    id: '63d4ec71-5df7-4a0e-9216-2510d47649e5',
    title: 'Plane sample',
    description: 'Despegue ligero',
    duration: 1759,
    tags: 'Vuelo, Aviones, Piloto',
    filedata: {
      bitrate: 1500,
      fileSize: 361993216,
      filename: '63d4ec71-5df7-4a0e-9216-2510d47649e5_Fast_H1500.mp4',
    },
    thumbnail: {
      id: '45e237c6-41be-40ec-9e20-0ae3c0bc2b52',
      name: 'thumbnail-media-63d4ec71-5df7-4a0e-9216-2510d47649e5',
      filename: '63d4ec71-5df7-4a0e-9216-2510d47649e5_3.jpg',
    },
  },
  {
    id: '196924be-ba33-400f-b26b-4a9a0a4e1069',
    title: 'Sample 360',
    description: '360 video sample',
    duration: 57,
    tags: '360, VR',
    filedata: {
      bitrate: 14000,
      fileSize: 95792128,
      filename: '196924be-ba33-400f-b26b-4a9a0a4e1069_Quality_H14000.mp4',
    },
    thumbnail: {
      id: 'f12a6802-adbd-4565-8386-3eeac299e70f',
      name: 'thumbnail-media-196924be-ba33-400f-b26b-4a9a0a4e1069',
      filename: '196924be-ba33-400f-b26b-4a9a0a4e1069_3.jpg',
    },
  },
  {
    id: 'ef286498-99f0-4b43-9a3a-c7fb764b9938',
    title: 'Penny',
    description: 'Test penny gem',
    duration: 64,
    tags: 'Sample, Penny gem',
    filedata: {
      bitrate: 1500,
      fileSize: 12346368,
      filename: 'ef286498-99f0-4b43-9a3a-c7fb764b9938_Fast_H1500.mp4',
    },
    thumbnail: {
      id: '45f3abab-89fa-4ef4-a213-6d9a8c0c115d',
      name: 'Penny gem',
      filename: 'ef286498-99f0-4b43-9a3a-c7fb764b9938_3.jpg',
    },
  },
] as IMedia[];

describe('MediaRouter', () => {
  // Run before all tests
  beforeEach(async () => {
    await MediaRepo.addMuliply(MEDIAS);
  });

  // Get all medias
  describe(`'GET:${Paths.Medias.Get}'`, () => {
    // Success
    it(
      'should return a JSON object with all the medias and a status code ' +
      `of '${HttpStatusCodes.OK}' if the request was successful.`,
      async () => {
        const res: TRes<{ medias: IMedia[] }> = await agent.get(
          Paths.Medias.Get,
        );
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(res.body.medias).toBeDefined();
        expect(Array.isArray(res.body.medias)).toBeTruthy();
      },
    );
  });

  // Test add media
  describe(`'POST:${Paths.Medias.Add}'`, () => {
    // Test add media success
    it(
      `should return a status code of '${HttpStatusCodes.CREATED}' if the ` +
      'request was successful.',
      async () => {
        const media = Media.new({
          title: 'Red',
          description: 'justice?',
          duration: 28,
          tags: 'Futbol',
          filedata: {
            bitrate: 2500,
            fileSize: 9646080,
            filename: 'c7436ec0-b1d5-440a-a918-180db83156c6_Fast_H2500.mp4',
          },
          thumbnail: {
            id: 'db23d9c1-b2b5-48f4-9893-3e7c60419ce9',
            name: 'death',
            filename: 'c7436ec0-b1d5-440a-a918-180db83156c6_3.jpg',
          },
        });
        const res = await agent.post(Paths.Medias.Add).send({ media });
        expect(res.status).toBe(HttpStatusCodes.CREATED);
      },
    );

    // Missing param
    it(
      'should return a JSON object with an error message of and a status ' +
      `code of '${HttpStatusCodes.BAD_REQUEST}' if the media param was ` +
      'missing.',
      async () => {
        const res: TRes = await agent
          .post(Paths.Medias.Add)
          .send({ media: null });
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        const errorObj = parseValidationErr(res.body.error);
        expect(errorObj.message).toBe(ValidationError.MESSAGE);
        expect(errorObj.errors[0].prop).toBe('media');
      },
    );

    // Invalid media object - missing title
    it(
      'should return a JSON object with an error message and a status code ' +
      `of '${HttpStatusCodes.BAD_REQUEST}' if the media object is invalid`,
      async () => {
        const invalidMedia = {
          description: 'Test description',
          duration: 300,
          tags: 'test',
        };
        const res: TRes = await agent
          .post(Paths.Medias.Add)
          .send({ media: invalidMedia });
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        const errorObj = parseValidationErr(res.body.error);
        expect(errorObj.message).toBe(ValidationError.MESSAGE);
      },
    );
  });
});
