/*
 * Copyright 2021 Larder Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { rest } from 'msw';
import {
  mockFileResponse,
  mockResponseFromBranch,
  mockCommentsFileResponse,
  mockRelativeImage,
} from './mock';

export const handlers = [
  rest.get(
    'https://api.github.com/repos/test/roadie-backstage-plugins/contents/.backstage/home-page.md',
    (req, res, ctx) => {
      if (req.headers.get('if-none-match') === 'random-generated-etag') {
        return res(ctx.status(304), ctx.json({}));
      }

      return res(
        ctx.set('etag', 'random-generated-etag'),
        ctx.json(mockFileResponse),
      );
    },
  ),
  rest.get(
    'https://api.github.com/repos/test/roadie-backstage-plugins/contents/.backstage/file-with-html-comments.md',
    (req, res, ctx) => {
      if (req.headers.get('if-none-match') === 'random-generated-etag') {
        return res(ctx.status(304), ctx.json({}));
      }

      return res(
        ctx.set('etag', 'random-generated-etag'),
        ctx.json(mockCommentsFileResponse),
      );
    },
  ),
  rest.get(
    'https://api.github.com/repos/test/roadie-backstage-plugins/contents/.backstage/file-with-relative-image.md',
    (req, res, ctx) => {
      if (req.headers.get('if-none-match') === 'random-generated-etag') {
        return res(ctx.status(304), ctx.json({}));
      }

      return res(
        ctx.set('etag', 'random-generated-etag'),
        ctx.json(mockRelativeImage),
      );
    },
  ),
  rest.get(
    'https://api.github.com/repos/test/foo-bar/contents/.backstage/home-page.md',
    (req, res, ctx) => {
      if (req.headers.get('if-none-match') === 'different-content-etag') {
        return res(ctx.status(304), ctx.json({}));
      }
      if (req.url.searchParams.get('ref') === 'not-default') {
        return res(
          ctx.set('etag', 'different-content-etag'),
          ctx.json(mockResponseFromBranch),
        );
      }
      return res(ctx.set('etag', 'empty-content-etag'), ctx.json({}));
    },
  ),
];
