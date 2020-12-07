const k8s = require('@kubernetes/client-node');
const request = require('request');

const getHandler = (req, res) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromCluster();

    const opts = {};
    kc.applyToRequest(opts);

    const response = request.get(
        `${kc.getCurrentCluster().server}/api/v1/namespaces/default/pods`,
        opts,
        (error, response, body) => {
            if (error) {
                console.log(`error: ${error}`);
            }
            if (response) {
                console.log(`statusCode: ${response.statusCode}`);
            }
            console.log(`body: ${body}`);
        }
    );

    // const response = fetch(
    //     `${kc.getCurrentCluster().server}/api/v1/namespaces/default/pods`,
    //     opts
    // )
    //     .then((res) => res.json())
    //     .catch((e) => console.error(`fetch error: ${e}`));

    // const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    // k8sApi
    //     .listNamespacedPod(
    //         'default',
    //         undefined,
    //         undefined,
    //         undefined,
    //         undefined,
    //         'app=nav-enonicxp-frontend'
    //     )
    //     .then((res) => {
    //         console.log(res.body, res.response);
    //     })
    //     .catch((e) => {
    //         console.log(`k8s call failed: ${e}`);
    //     });

    res.status(200).json({
        cluster: kc.getCurrentCluster(),
        options: opts,
        response,
    });
};

export default getHandler;
