import { fetchJson } from '../../../utils/fetch-utils';

const getLeader = async () =>
    fetchJson(`http://${process.env.ELECTOR_PATH}`).then((json) => {
        if (json) {
            console.log(`Leader json: ${JSON.stringify(json)}`);
            return json.name;
        }
        return null;
    });

const isReady = async (req, res) => {
    console.log(`Elector path: ${process.env.ELECTOR_PATH}`);
    const leaderHostname = await getLeader();
    console.log(`Leader hostname: ${leaderHostname}`);
    if (leaderHostname) {
        await fetchJson(leaderHostname).then((json) => {
            if (json) {
                console.log(`Leader response: ${json.timestamp}`);
            }
        });
    }

    return res.status(200).json({ message: 'Ok!' });
};

export default isReady;
