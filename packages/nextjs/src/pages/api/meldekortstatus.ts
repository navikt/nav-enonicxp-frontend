import { getToken, requestTokenxOboToken } from '@navikt/oasis';
import { fetchJson } from '@/shared/fetch-utils';
import { logger } from '@/shared/logger';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MeldekortStatusResponse } from 'utils/fetch/fetch-meldekort-status';
import { slaSammenMeldekort } from 'utils/fetch/helper/meldekortstatus-merger';

const meldekortApiStatusUrl = `${process.env.MELDEKORT_API_URL}/meldekortstatus`;
const dpMeldekortStatusUrl = `${process.env.DP_MELDEKORT_URL}`;
const meldekortApiAudience = process.env.MELDEKORT_API_AUDIENCE || '';
const dpMeldekortAudience = process.env.DP_MELDEKORT_AUDIENCE || '';

type fetchSingleMeldekortStatusParams = {
    url: string;
    audience: string;
    oboToken: string;
};

const fetchSingleMeldekortStatus = async ({
    url,
    audience,
    oboToken,
}: fetchSingleMeldekortStatusParams): Promise<MeldekortStatusResponse | null> => {
    logger.info(`Meldekortstatus: Fetch meldekort status from ${url} with audience ${audience}`);
    const tokenResult = await requestTokenxOboToken(oboToken, audience);
    let token = '';

    if (tokenResult.ok) {
        token = tokenResult.token;
    } else {
        logger.error(`Meldekortstatus: Token request failed: ${tokenResult.error}`);
        return null;
    }

    try {
        const headers: HeadersInit = {
            Authorization: `Bearer ${token}`,
        };

        const response = await fetchJson<MeldekortStatusResponse>(url, 5000, {
            credentials: 'include',
            headers,
        });

        logger.info(
            `Meldekortstatus: Fetched meldekort status from ${url}: ${JSON.stringify(response)}`
        );

        if (!response) {
            logger.error(`Meldekortstatus: Failed to fetch meldekort status from ${url}`);
            return null;
        }

        return response;
    } catch (error: any) {
        logger.error(`Meldekortstatus: Error fetching meldekort status from ${url}:`, error);
        return null;
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MeldekortStatusResponse | null | { error: string }>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    logger.info(`Meldekortstatus: Handling /api/meldekortstatus request`);

    const isLocal = process.env.ENV === 'localhost';
    const oboToken = isLocal ? 'foobartoken' : getToken(req);

    // This endpoint should only be called when the user is
    // authenticated, so it's safe to return 401 if no token is found.
    // (ref noise in console from 401 returns on random auth blocked requests)
    if (!oboToken) {
        logger.error('Meldekortstatus: No token found in request');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const [meldekortApiResponse, dpMeldekortResponse] = await Promise.all([
            fetchSingleMeldekortStatus({
                url: meldekortApiStatusUrl,
                audience: meldekortApiAudience,
                oboToken,
            }),
            fetchSingleMeldekortStatus({
                url: dpMeldekortStatusUrl,
                audience: dpMeldekortAudience,
                oboToken,
            }),
        ]);

        const response = slaSammenMeldekort({
            meldekortFraArena: meldekortApiResponse,
            meldekortFraDp: dpMeldekortResponse,
        });

        res.send(response);
    } catch (error: any) {
        logger.error(`Meldekortstatus: Error fetching meldekort status:`, error);
        res.status(500).json(null);
        return;
    }
}
