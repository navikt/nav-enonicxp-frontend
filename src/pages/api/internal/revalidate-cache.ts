const { SERVICE_SECRET } = process.env;

const invalidateCache = (path: string) => {
    fetch(`http://localhost:3000${path}`, {
        method: 'GET',
        headers: {
            secret: SERVICE_SECRET,
            invalidate: 'true',
        },
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

    invalidateCache(path);

    return res.status(200).send(`Received revalidate request for ${path}`);
};

export default revalidateCache;
