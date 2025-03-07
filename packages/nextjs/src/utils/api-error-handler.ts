import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@/shared/logger';

export const apiErrorHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
    handler: () => Promise<any>
) => {
    try {
        return await handler();
    } catch (e) {
        logger.error(`Api error - ${e}`);
        // If we rewrite an url to an api page, the res object will be empty if the page is prefetched by the
        // client. We just return null in such cases. React will throw errors, but at least the server won't crash :)
        // This should not happen as long as any rewritten urls are not considered internal paths by our routing logic
        // (see utils/urls.ts)
        if (res?.status) {
            return res.status(500).send('Ukjent server-feil');
        } else {
            return null;
        }
    }
};
