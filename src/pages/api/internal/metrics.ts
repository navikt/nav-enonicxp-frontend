import prometheus from 'prom-client';

if (process.env.NODE_ENV === 'development') {
    prometheus.register.clear();
}

prometheus.collectDefaultMetrics();

const metrics = async (req, res) => {
    res.setHeader('Content-Type', prometheus.register.contentType);
    res.end(await prometheus.register.metrics());
};

export default metrics;
