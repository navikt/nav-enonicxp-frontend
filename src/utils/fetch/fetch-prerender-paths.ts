import { fetchJson } from './fetch-utils';
import { xpServiceUrl } from '../urls';

const excludedPaths = {
    '/': true, // This is already rendered by /index.tsx
};

export const fetchPrerenderPaths = async (retries = 3) =>
    fetchJson(`${xpServiceUrl}/sitecontentPaths`, 60000, {
        headers: {
            secret: process.env.SERVICE_SECRET,
        },
    })
        .then((paths) => {
            if (Array.isArray(paths)) {
                // Remove paths with illegal filename characters on Windows systems.
                // Next.js page cache throws errors when attempting to cache these paths, which
                // aborts the build process.
                // Should only be applicable for local testing, we don't deploy to Windows
                if (process.platform === 'win32') {
                    return paths.filter((path) => !path.match(/[<>:"\\|?*]/));
                }
                return paths;
            }

            if (retries > 0) {
                console.warn(
                    `Failed to fetch paths to prerender, ${retries} retries left`
                );
                return fetchPrerenderPaths(retries - 1);
            }

            console.error('Failed to fetch paths to prerender');
            return null;
        })
        .then((paths) => {
            if (!paths) {
                return paths;
            }

            return paths.filter((path) => !excludedPaths[path]);
        });
