import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import PageBase from '../../components/PageBase';
import { routerQueryToXpPathOrId } from '../../utils/urls';
import { fetchPage } from '../../utils/fetch-content';
import { ParsedUrlQuery } from 'querystring';
import { getTargetIfRedirect } from '../../utils/redirects';
import { isMediaContent } from '../../types/media';
import { makeErrorProps } from '../../utils/make-error-props';
import { isNotFound } from '../../utils/errors';

// TODO: validate datetime string
const getValidDateTime = (dateTime: string | string[]) => {
    return Array.isArray(dateTime) ? dateTime[0] : dateTime;
};

// TODO: make a new view for version status pages when non-displayable content is found
// Using error-page for now
const noContentToRenderResponse = (path: string, msg: string) => {
    return {
        props: makeErrorProps(path, msg, 200),
    };
};

export const fetchVersionPageProps = async (
    context: GetServerSidePropsContext<ParsedUrlQuery>,
    isDraft: boolean
) => {
    const { time, id } = context.query;

    const xpPath = routerQueryToXpPathOrId(
        id || context?.params?.versionRouter
    );

    const content = await fetchPage(
        xpPath,
        isDraft,
        process.env.SERVICE_SECRET,
        getValidDateTime(time)
    );

    if (isMediaContent(content)) {
        return noContentToRenderResponse(
            xpPath,
            'Dette innholdet er en media-fil'
        );
    }

    if (isNotFound(content)) {
        return noContentToRenderResponse(xpPath, `Innholdet ble ikke funnet`);
    }

    const redirectTarget = getTargetIfRedirect(content);
    if (redirectTarget) {
        return noContentToRenderResponse(
            xpPath,
            `Denne siden redirecter til ${redirectTarget}`
        );
    }

    return { props: { content } };
};

const prodRouter = async (context) => {
    const secret = context.req.headers.secret as string;
    if (secret !== process.env.SERVICE_SECRET) {
        return {
            props: {},
            notFound: true,
        };
    }

    return fetchVersionPageProps(context, false);
};

const devRouter = async (context) => {
    return fetchVersionPageProps(context, false);
};

export const getServerSideProps: GetServerSideProps =
    process.env.ENV === 'prod' ? prodRouter : devRouter;

export default PageBase;
