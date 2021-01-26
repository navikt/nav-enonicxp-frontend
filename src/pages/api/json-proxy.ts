import { fetchWithTimeout } from '../../utils/fetch-utils';

type Params = {
    path: string;
};

const handler = async (req, res) => {
    const { path } = req.query as Params;

    if (!path || !path.endsWith('.json')) {
        return res.status(400).json({ error: 'Invalid json path' });
    }

    const url = `http://localhost:3000${encodeURI(path)}`;

    const json = await fetchWithTimeout(url, 5000)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((e) =>
            console.log(`Error fetching json for path ${path} - ${e}`)
        );

    if (json) {
        res.status(200).json(json);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
};

export default handler;
