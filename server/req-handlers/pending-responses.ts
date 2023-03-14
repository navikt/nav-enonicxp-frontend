import NextNodeServer from 'next/dist/server/next-server';
import { RequestHandler } from 'express';

const getPendingResponses = (nextServer: NextNodeServer) => {
    try {
        const pendingResponses = nextServer['responseCache'].pendingResponses;
        return pendingResponses;
    } catch (e) {
        console.error(`Error accessing pendingResponses - ${e}`);
        return null;
    }
};

export const handleGetPendingResponses =
    (nextServer: NextNodeServer): RequestHandler =>
    (req, res) => {
        const pending = getPendingResponses(nextServer);

        return pending
            ? res.status(200).send(pending)
            : res
                  .status(500)
                  .send(
                      'Failed to retrieve pending responses - see logs for details'
                  );
    };
