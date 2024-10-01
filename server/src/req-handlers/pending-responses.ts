import NextNodeServer from 'next/dist/server/next-server';
import { RequestHandler } from 'express';
import { logger } from 'srcCommon/logger';

const getPendingResponses = (nextServer: NextNodeServer) => {
    try {
        const pendingResponses = nextServer['responseCache'].pendingResponses;
        return pendingResponses?.size > 0 ? [...pendingResponses.keys()] : [];
    } catch (e) {
        logger.error(`Error accessing pendingResponses - ${e}`);
        return null;
    }
};

export const handleGetPendingResponses =
    (nextServer: NextNodeServer): RequestHandler =>
    (req, res) => {
        const pending = getPendingResponses(nextServer);

        if (pending) {
            res.status(200).send(pending);
        } else {
            res.status(500).send('Failed to retrieve pending responses - see logs for details');
        }
    };
