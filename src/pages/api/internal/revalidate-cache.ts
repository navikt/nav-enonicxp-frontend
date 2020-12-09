import { networkInterfaces } from 'os';
import fs from 'fs';
import { fetchWithTimeout } from '../../../utils/fetch-utils';

const cacheBasePath = './.next/server/pages';

const nets = networkInterfaces();
const podIp = nets.eth0?.[0]?.address;

const deleteFile = (filePath: string) => {
    try {
        fs.unlinkSync(filePath);
    } catch (e) {
        console.error(
            `File system error while attemping to delete ${filePath} - ${e}`
        );
    }
};

const clearPageCache = (path: string) => {
    console.log(`Clearing cache for ${path} on ${podIp}`);
    deleteFile(`${cacheBasePath}${path}.json`);
    deleteFile(`${cacheBasePath}${path}.html`);
};

const regeneratePageCache = (path: string) =>
    fetchWithTimeout(`http://localhost:3000${path}`, 1000, {
        method: 'HEAD',
    }).catch((e) =>
        console.error(`Regeneration for path ${path} on ${podIp} failed - ${e}`)
    );

const revalidateCache = async (req, res) => {
    const { path } = req.query;

    if (!path) {
        return res.status(400).send('No path specified');
    }

    clearPageCache(path);
    regeneratePageCache(path);

    return res.status(200).send(`Regenerated cache for ${path}`);
};

export default revalidateCache;
