import fs, { readFileSync } from 'fs';
import pLimit from 'p-limit';
import { removeDuplicates } from 'utils/arrays';
import { logger } from 'srcCommon/logger';

// Limit concurrent fetches
const limit = pLimit(5);

const manifestDir = (typeof process.env !== 'undefined' && process.env.IMAGE_CACHE_DIR) || '.';

const manifestFile = `${manifestDir}/image-manifest`;

// This should only run for pages that are generated at build-time
// Pages generated from dynamic routes will have their images cached
// automatically at request-time
export const updateImageManifest = (src: string) => {
    if (!fs.existsSync(manifestDir)) {
        logger.info(`Creating image manifest dir ${manifestDir}`);
        fs.mkdirSync(manifestDir, { recursive: true });
    }

    fs.appendFile(manifestFile, `${src}\n`, { encoding: 'utf-8' }, (e) => {
        if (e) {
            logger.error(`Error while appending to image manifest - ${e}`);
        } else {
            logger.info(`Appended ${src} to image manifest`);
        }
    });
};

export const processImageManifest = async () => {
    if (!fs.existsSync(manifestFile)) {
        logger.info('No image manifest found, aborting');
        return;
    }

    const fileContent = readFileSync(manifestFile, { encoding: 'utf-8' });

    const urls = removeDuplicates(fileContent.split('\n').filter(Boolean));

    logger.info(`Prefetching ${urls.length} urls from image manifest`);

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
                    logger.error(`Bad response for image ${url} - ${res.status} ${res.statusText}`);
                    return false;
                })
                .catch((e) => {
                    logger.error(`Fetch error for image ${url} - ${e}`);
                    return false;
                })
        )
    );
};

export const clearImageManifest = () => {
    if (fs.existsSync(manifestFile)) {
        logger.info('Removing image manifest file');
        fs.unlinkSync(manifestFile);
    } else {
        logger.info('No image manifest file found, nothing to remove');
    }
};
