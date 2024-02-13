import * as os from 'os';

export const isLeaderPod = async (): Promise<boolean> => {
    const electorPath = process.env.ELECTOR_PATH;
    if (!electorPath) {
        console.log('ELECTOR_PATH is not defined');
        return true;
    }

    return fetch(`http://${electorPath}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            console.error(
                `Error fetching leader, assuming I'm leader - ${res.status} ${res.statusText}`
            );
            return true;
        })
        .then((json) => {
            return json.name === os.hostname();
        })
        .catch((e) => {
            console.error(
                `Error determining leader, assuming I'm leader - ${e}`
            );
            return true;
        });
};
