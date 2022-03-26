import { fetchJson } from './fetch-utils';
import { xpServiceUrl } from '../urls';

export const fetchPrerenderPaths = async (retries = 3) =>
    fetchJson(`${xpServiceUrl}/sitecontentPaths`, 60000, {
        headers: {
            secret: process.env.SERVICE_SECRET,
        },
    }).then((pathsFromXp) => {
        if (Array.isArray(pathsFromXp)) {
            // Remove paths with illegal characters on Windows file systems.
            // Next.js page cache throws errors when attempting to cache these
            // paths, which crashes the build process.
            // Should only be applicable for local testing.
            if (process.platform === 'win32') {
                return pathsFromXp.filter((path) => !path.match(/[<>:"\\|?*]/));
            }
            return pathsFromXp;
        }

        if (retries > 0) {
            console.warn(
                `Failed to fetch paths to prerender, ${retries} retries left`
            );
            return fetchPrerenderPaths(retries - 1);
        }

        console.error('Failed to fetch paths to prerender');
        return null;
    });
