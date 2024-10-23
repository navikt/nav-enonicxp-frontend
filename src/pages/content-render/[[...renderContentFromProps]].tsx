import { GetServerSideProps } from 'next';
import { parseBody } from 'next/dist/server/api-utils/node/parse-body';
import { PageBase } from 'components/PageBase';
import { validateSecretHeader } from 'srcCommon/auth';
import { makeErrorProps } from 'utils/make-error-props';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (!validateSecretHeader(req) || req.method !== 'POST') {
        return {
            notFound: true,
        };
    }

    const body = await parseBody(req, '5MB');

    return {
        props: {
            content: body?.contentProps ?? makeErrorProps(),
        },
    };
};

export default PageBase;
