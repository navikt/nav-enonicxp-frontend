import { promises as fs } from 'fs';
import path from 'path';

let cachedBuildId: string | null = null;

export const getNextBuildId = async (): Promise<string> => {
    if (cachedBuildId) return cachedBuildId;

    try {
        const buildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');
        cachedBuildId = await fs.readFile(buildIdPath, 'utf-8');
        return cachedBuildId.trim();
    } catch (error) {
        console.error('Could not read build ID:', error);
        return 'unknown-build-id';
    }
};
