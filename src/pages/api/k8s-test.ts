const k8s = require('@kubernetes/client-node');

const getHandler = (req, res) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromCluster();
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

    k8sApi
        .listNamespacedPod(
            'default',
            undefined,
            undefined,
            undefined,
            undefined,
            'app=nav-enonicxp-frontend'
        )
        .then((res) => {
            console.log(res.body, res.response);
        })
        .catch((e) => {
            console.log(`k8s call failed: ${e}`);
        });

    res.status(200).json(kc.getCurrentCluster());
};

export default getHandler;
