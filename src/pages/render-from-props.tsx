import { GetServerSideProps } from 'next';
import { parseBody } from 'next/dist/server/api-utils/node/parse-body';
import { PageBase } from 'components/PageBase';
import { validateSecretHeader } from 'shared/auth';

// Render a page using props from the request body
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    if (!validateSecretHeader(req) || req.method !== 'POST') {
        return {
            notFound: true,
        };
    }

    const contentProps = (await parseBody(req, '5MB'))?.contentProps;

    if (!contentProps) {
        // The type for req/res is incomplete...
        return (res as any).status(400).send('Missing contentProps in request body');
    }

    return {
        props: {
            content: contentProps,
        },
    };
};

export default PageBase;
