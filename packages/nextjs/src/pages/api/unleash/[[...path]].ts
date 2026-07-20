import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@/shared/logger';

const getUpstreamConfig = () => {
    const upstreamUrl = process.env.UNLEASH_SERVER_API_URL;
    const upstreamToken = process.env.UNLEASH_SERVER_API_TOKEN;

    return {
        upstreamUrl: upstreamUrl?.replace(/\/$/, ''),
        upstreamToken,
    };
};

const getProxyPath = (queryPath: NextApiRequest['query']['path']) => {
    if (Array.isArray(queryPath)) {
        return queryPath.join('/');
    }

    if (typeof queryPath === 'string') {
        return queryPath;
    }

    return '';
};

const buildQueryString = (query: NextApiRequest['query']) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (key === 'path') {
            return;
        }

        if (Array.isArray(value)) {
            value.forEach((item) => params.append(key, item));
            return;
        }

        if (typeof value === 'string') {
            params.append(key, value);
        }
    });

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    const { upstreamUrl, upstreamToken } = getUpstreamConfig();

    if (!upstreamUrl || !upstreamToken) {
        logger.error('Unleash proxy is not configured');
        return res.status(500).send('Unleash proxy is not configured');
    }

    const proxyPath = getProxyPath(req.query.path);

    if (!proxyPath.startsWith('client/')) {
        return res.status(400).send('Invalid Unleash proxy path');
    }

    const targetUrl = `${upstreamUrl}/${proxyPath}${buildQueryString(req.query)}`;

    const requestHeaders = new Headers();
    requestHeaders.set('authorization', upstreamToken);

    const appNameHeader = req.headers['unleash-appname'];
    if (typeof appNameHeader === 'string') {
        requestHeaders.set('unleash-appname', appNameHeader);
    }

    const contentType = req.headers['content-type'];
    if (typeof contentType === 'string') {
        requestHeaders.set('content-type', contentType);
    }

    const accept = req.headers.accept;
    if (typeof accept === 'string') {
        requestHeaders.set('accept', accept);
    }

    const body = req.method === 'POST' ? JSON.stringify(req.body) : undefined;

    const upstreamResponse = await fetch(targetUrl, {
        method: req.method,
        headers: requestHeaders,
        body,
    });

    const responseContentType = upstreamResponse.headers.get('content-type');
    const responseCacheControl = upstreamResponse.headers.get('cache-control');

    if (responseContentType) {
        res.setHeader('content-type', responseContentType);
    }

    if (responseCacheControl) {
        res.setHeader('cache-control', responseCacheControl);
    }

    const responseBody = await upstreamResponse.text();

    return res.status(upstreamResponse.status).send(responseBody);
};

export default handler;
