import { fetchWithTimeout } from '../../utils/fetchWithTimeout';

type Params = {
    path: string;
};

const appOrigin = process.env.APP_ORIGIN;

const handler = async (req, res) => {
    const { path } = req.query as Params;

    if (!path) {
        return res.status(400).json({ error: 'Invalid path' });
    }

    // The path requested by Content Studio comes in two different formats:
    // 1. /_next/data/<build id>/<content path>.json (same as the path used in this app)
    // 2. /_next/data/<build id>/admin/site/<mode (live|inline|edit)>/default/<branch (draft|master)>/<site hostname (www.nav.no)>/<content path>.json
    const pathSegments = path.replace('/www.nav.no', '').split('/');

    // Sets the correct path, keeping in mind option 2
    const correctPath =
        pathSegments[4] === 'admin'
            ? `${pathSegments.slice(0, 4).join('/')}/${pathSegments
                  .slice(9)
                  .join('/')}`
            : path;

    const nextUrl = `${appOrigin}${correctPath}`;

    const json = await fetchWithTimeout(nextUrl, 5000)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((e) => console.log(`error fetching json: ${e}`));

    if (json) {
        res.status(200).json(json);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
};

export default handler;
