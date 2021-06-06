import { fetchWithTimeout } from '../../utils/fetch-utils';
import { xpServiceUrl } from '../../utils/urls';

type Params = {
    xpPath: string;
};

const handler = async (req, res) => {
    const { xpPath } = req.query as Params;

    if (!xpPath) {
        return res.status(400).json({ error: 'No path was specified' });
    }

    const xpPathToCustomPublicPathMap = await fetchWithTimeout(
        `${xpServiceUrl}/customPaths`,
        15000
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((e) => console.log(`Error fetching custom paths map - ${e}`));

    console.log(xpPathToCustomPublicPathMap);

    res.send(xpPathToCustomPublicPathMap?.[xpPath] || xpPath);
};

export default handler;
