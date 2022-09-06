import { makeErrorProps } from '../utils/make-error-props';
import { PageBase } from '../components/PageBase';
import { ContentProps } from '../types/content-props/_content-common';
import { v4 as uuid } from 'uuid';
import { logPageLoadError } from '../utils/errors';
import { fetchWithTimeout } from '../utils/fetch/fetch-utils';

const fetchFailoverHtml = async (path: string) => {
    const url = `${process.env.FAILOVER_ORIGIN}${path}`;
    console.log(`Fetching failover html from ${url}`);

    return fetchWithTimeout(url, 15000, {
        headers: {
            secret: process.env.SERVICE_SECRET,
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.text();
            }

            console.error(`Error response from failover: ${res.status}`);
            return null;
        })
        .catch((e) => {
            console.error(`Exception from failover fetch: ${e}`);
            return null;
        });
};

const handleClientsideError = (err: any) => {
    if (!err?.content) {
        return makeErrorProps();
    }

    const errorCode = err.content.data?.errorCode;
    if (errorCode === 404) {
        console.log('Reloading');
        window.location.reload();
        return;
    }

    return err.content;
};

const Error = (props: ContentProps) => <PageBase content={props} />;

Error.getInitialProps = async (context): Promise<ContentProps> => {
    const { res, err, asPath } = context;

    // If the error occured client-side, res will not be defined
    if (!res) {
        console.log(`Path: ${asPath}`);
        return handleClientsideError(err);
    }

    if (process.env.IS_FAILOVER_INSTANCE !== 'true') {
        const failoverHtml = await fetchFailoverHtml(asPath);

        if (failoverHtml) {
            return res.status(200).send(failoverHtml);
        }
    }

    res.statusCode = err?.content?.data?.errorCode || res.statusCode;

    const errorId = uuid();
    const errorMsg = err?.toString() || 'Empty error message';

    logPageLoadError(
        errorId,
        `Unhandled error on path ${asPath} - ${errorMsg}`
    );

    return makeErrorProps(asPath, errorMsg, res.statusCode, errorId);
};

export default Error;
