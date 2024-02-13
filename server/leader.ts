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
        })
        .then((json) => {
            const hostname = os.hostname();
            console.log(
                `Leader election result, comparing with my hostname: ${hostname} `,
                json
            );
            return json.name === hostname;
        })
        .catch((e) => {
            console.error(
                `Error determining leader, assuming I'm leader - ${e}`
            );
            return true;
        });
};
