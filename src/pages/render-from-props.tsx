import { GetServerSideProps } from 'next';
import { parseBody } from 'next/dist/server/api-utils/node/parse-body';
import { PageBase } from 'components/PageBase';
import { validateSecretHeader } from 'srcCommon/auth';

// Render a page using props from the request body
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    if (!validateSecretHeader(req)) {
        return {
            notFound: true,
        };
    }

    if (req.method !== 'POST') {
        return (res as any).status(405).send();
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
