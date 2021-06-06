import { fetchWithTimeout } from '../../utils/fetch-utils';
import { xpServiceUrl } from '../../utils/urls';

const handler = async (req, res) => {
    const xpPathToCustomPublicPathMap = await fetchWithTimeout(
        `${xpServiceUrl}/customPaths`,
        15000
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((e) => {
            console.log(`Error fetching custom paths map - ${e}`);
            return {};
        });

    res.send(xpPathToCustomPublicPathMap);
};

export default handler;
