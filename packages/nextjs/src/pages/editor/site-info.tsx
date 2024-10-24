import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest } from 'next';
import express from 'express';
import util from 'util';
import { SiteInfo } from 'components/_editor-only/site-info/SiteInfo';
import { validateSecretHeader } from '@/shared/auth';

const parseReqBody = util.promisify(express.json({ limit: '10MB' }));

export const getServerSideProps: GetServerSideProps = async ({
    req,
    res,
}: GetServerSidePropsContext) => {
    if (!validateSecretHeader(req)) {
        return {
            notFound: true,
        };
    }

    await parseReqBody(req, res);

    return { props: (req as NextApiRequest).body };
};

export default SiteInfo;
