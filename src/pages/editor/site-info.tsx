import {
    GetServerSideProps,
    GetServerSidePropsContext,
    NextApiRequest,
} from 'next';
import { SiteInfo } from 'components/_editor-only/site-info/SiteInfo';
import express from 'express';
import util from 'util';

const parseReqBody = util.promisify(express.json({ limit: '10MB' }));

export const getServerSideProps: GetServerSideProps = async ({
    req,
    res,
}: GetServerSidePropsContext) => {
    const secret = req.headers.secret;
    if (secret !== process.env.SERVICE_SECRET) {
        return {
            notFound: true,
        };
    }

    await parseReqBody(req, res);

    return { props: (req as NextApiRequest).body };
};

export default SiteInfo;
