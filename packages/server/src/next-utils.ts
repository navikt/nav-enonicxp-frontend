import { promises as fs } from 'fs';
import path from 'path';

let cachedBuildId: string | null = null;

export const getNextBuildId = async (): Promise<string> => {
    if (cachedBuildId) return cachedBuildId;

    let buildIdPath = path.join(process.cwd(), 'nextjs', '.next', 'BUILD_ID');

    // The test (process.cwd) already runs in the nextjs directory, so make sure
    // to fetch BUILD_ID file from the correct path.
    if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined) {
        buildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');
    }

    try {
        cachedBuildId = await fs.readFile(buildIdPath, 'utf-8');
        return cachedBuildId.trim();
    } catch (error) {
        console.error('Could not read build ID:', error);
        return 'unknown-build-id';
    }
};
