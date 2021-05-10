import { fetchWithTimeout } from '../../../utils/fetch-utils';
import Config from '../../../config';
import fs from 'fs';

const cacheBasePath = './.next/server/pages';
const revalidatePeriodMs = Config.vars.revalidatePeriod * 1000;
const { SERVICE_SECRET } = process.env;

const regeneratePageCache = (path: string) => {
    console.log(`Regenerating page cache for ${path}`);
    fetchWithTimeout(`http://localhost:3000${path}`, 1000, {
        method: 'HEAD',
    }).catch((e) =>
        console.error(`Regenerating page cache failed for ${path} - ${e}`)
    );
};

const revalidateCache = async (req, res) => {
    const { secret } = req.headers;
    if (secret !== SERVICE_SECRET) {
        return res.status(401).send('Not authorized');
    }

    const { path } = req.query;
    if (!path) {
        return res.status(400).send('No path specified');
    }

    if (!fs.existsSync(`${cacheBasePath}${encodeURI(path)}.html`)) {
        const msg = `No page cache found for ${path} - regeneration not needed`;
        console.log(msg);
        return res.status(200).send(msg);
    }

    setTimeout(() => regeneratePageCache(path), revalidatePeriodMs);

    return res.status(200).send(`Regenerating cache for ${path}`);
};

export default revalidateCache;
