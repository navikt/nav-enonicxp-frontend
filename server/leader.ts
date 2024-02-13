import * as os from 'os';

const CACHE_TTL_MS = 60 * 1000;

const cache = {
    isLeader: true,
    expires: 0,
};

const isLeaderPodReal = async (): Promise<boolean> => {
    if (Date.now() < cache.expires) {
        return cache.isLeader;
    }

    const electorPath = process.env.ELECTOR_PATH;
    if (!electorPath) {
        console.error('ELECTOR_PATH is not defined!');
        return cache.isLeader;
    }

    const isLeader = await fetch(`http://${electorPath}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            console.error(
                `Error fetching leader - ${res.status} ${res.statusText}`
            );
            return null;
        })
        .then((json) => {
            return json.name === os.hostname();
        })
        .catch((e) => {
            console.error(`Error determining leader - ${e}`);
            return null;
        });

    if (isLeader === null) {
        return cache.isLeader;
    }

    cache.isLeader = isLeader;
    cache.expires = Date.now() + CACHE_TTL_MS;

    return isLeader;
};

const isLeaderPodDummy = async () => true;

export const isLeaderPod =
    process.env.ENV === 'localhost' ? isLeaderPodDummy : isLeaderPodReal;
