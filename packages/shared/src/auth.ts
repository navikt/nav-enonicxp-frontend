import { Request } from 'express';
import { NextApiRequest } from 'next';
import type { IncomingMessage } from 'http';

export const validateSecretHeader = (req: Request | NextApiRequest | IncomingMessage) => {
    return req.headers.secret === process.env.SERVICE_SECRET;
};
