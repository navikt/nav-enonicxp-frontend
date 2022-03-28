import fs, { readFileSync } from 'fs';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import pLimit from 'p-limit';
import { removeDuplicates } from '../arrays';

// Limit concurrent fetches
const limit = pLimit(5);

const manifestFile = './image-manifest';

// This should only run for pages that are generated at build-time
// Pages generated from dynamic routes will have their images cached
// automatically at request-time
export const updateImageManifest = (src: string) => {
    fs.appendFile(manifestFile, `${src}\n`, { encoding: 'utf-8' }, (e) => {
        if (e) {
            console.error(`Error while appending to image manifest - ${e}`);
        }
    });
};

export const processImageManifest = async () => {
    if (!fs.existsSync(manifestFile)) {
        console.log('No image manifest found, aborting');
        return;
    }

    const fileContent = readFileSync(manifestFile, { encoding: 'utf-8' });

    const urls = removeDuplicates(fileContent.split('\n').filter(Boolean));

    console.log(`Prefetching ${urls.length} urls from image manifest`);

    return Promise.all(
        urls.map((url) =>
            limit(() =>
                fetch(url, {
                    headers: {
                        Accept: 'image/avif,image/webp,image/svg+xml,image/*,*/*',
                    },
                })
            )
                .then((res) => {
                    if (res.ok) {
                        return true;
                    }
                    console.error(
                        `Bad response for image ${url} - ${res.status} ${res.statusText}`
                    );
                    return false;
                })
                .catch((e) => {
                    console.error(`Fetch error for image ${url} - ${e}`);
                    return false;
                })
        )
    );
};

export const clearImageManifest = () => {
    if (fs.existsSync(manifestFile)) {
        console.log('Removing image manifest file');
        fs.unlinkSync(manifestFile);
    } else {
        console.log('No image manifest file found, nothing to remove');
    }
};
