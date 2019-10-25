/**
 *
 * Asynchronously loads the component for AlbumPhotos
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
