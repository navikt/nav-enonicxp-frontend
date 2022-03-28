import fs, { readFileSync } from 'fs';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import pLimit from 'p-limit';

// Limit concurrent fetches
const limit = pLimit(5);

const manifestFile = './image-manifest';

// This should only run for pages that are generated at build-time
// Pages generated from dynamic routes will have their images cached
// automatically at request-time
export const updateImageManifest =
    process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
        ? (src: string) => {
              fs.appendFileSync(manifestFile, `${src}\n`, {
                  encoding: 'utf-8',
              });
          }
        : () => {};

export const processImageManifest = async () => {
    if (!fs.existsSync(manifestFile)) {
        console.log('No image manifest found, aborting');
        return;
    }

    const urls = readFileSync(manifestFile, { encoding: 'utf-8' })
        .split('\n')
        .filter(Boolean);

    console.log(`Prefetching ${urls.length} urls from image manifest`);

    return Promise.all(
        urls.map((url) =>
            limit(() =>
                fetch(url, { method: 'HEAD' })
                    .then((res) => {
                        if (!res.ok) {
                            console.log(
                                `Bad response for ${url} - ${res.status} ${res.statusText}`
                            );
                        }
                    })
                    .catch((e) => {
                        console.log(`Fetch error for url ${url} - ${e}`);
                    })
            )
        )
    );
};

export const clearImageManifest = () => {
    if (fs.existsSync(manifestFile)) {
        console.log('Removing manifest file');
        fs.unlinkSync(manifestFile);
    } else {
        console.log('No manifest file found, nothing to remove');
    }
};
