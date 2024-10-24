import React from 'react';
import { v4 as uuid } from 'uuid';
import { NextApiResponse, NextPageContext } from 'next';
import { fetchWithTimeout } from '@/shared/fetch-utils';
import { logger } from '@/shared/logger';
import { makeErrorProps } from 'utils/make-error-props';
import { PageBase } from 'components/PageBase';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { logPageLoadError } from 'utils/errors';

const isFailoverInstance = process.env.IS_FAILOVER_INSTANCE === 'true';

// Workaround for next.js bug which fail to propagate error props from the server for client-side rendering
// See related issue: https://github.com/vercel/next.js/issues/39616
const getClientsideProps = (path?: string) => {
    if (typeof document === undefined) {
        logger.error(
            `document was unexpectedly not defined in client-side error controller on ${path}`
        );
        return null;
    }

    const nextData = document.getElementById('__NEXT_DATA__')?.textContent;
    if (!nextData) {
        logger.error(`__NEXT_DATA__ not found on ${path}`);
        return null;
    }

    try {
        const contentProps = JSON.parse(nextData)?.props?.pageProps as ContentProps;
        if (contentProps.type !== ContentType.Error) {
            logger.error(
                `Unexpected __NEXT_DATA__ contentProps on ${path} - ${contentProps._id} ${contentProps.type}`
            );
            return null;
        }

        return contentProps;
    } catch (e) {
        logger.error(`Failed to parse __NEXT_DATA__ on ${path} - ${e}`);
        return null;
    }
};

const fetchFailoverHtml = async (path: string): Promise<string | null> => {
    const url = `${process.env.FAILOVER_ORIGIN}${path}`;
    logger.info(`Fetching failover html from ${url}`);

    return fetchWithTimeout(url, 15000, {
        headers: {
            secret: process.env.SERVICE_SECRET,
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.text();
            }

            logger.error(`Error response from failover: ${res.status}`);
            return null;
        })
        .catch((e) => {
            logger.error(`Exception from failover fetch: ${e}`);
            return null;
        });
};

const parseErrorContent = (err?: Error | null, asPath?: string) => {
    if (!err) {
        return null;
    }

    try {
        return JSON.parse(err.toString().replace('Error: ', '')).content as
            | ContentProps
            | undefined;
    } catch (e) {
        logger.error(`Failed to parse error content on ${asPath}`);
        return null;
    }
};

const hasFileExtensionPattern = /\.[a-zA-Z0-9]+($|\?|#)/;

// The failover app should not fetch from itself, and we only want to fetch html-documents
// Ignore requests for json-files, images, etc
const shouldFetchFromFailoverApp = (path: string) =>
    !isFailoverInstance && !hasFileExtensionPattern.test(path);

const ErrorComponent = (props: ContentProps) => <PageBase content={props} />;

ErrorComponent.getInitialProps = async ({
    req,
    res,
    err,
    asPath,
}: Omit<NextPageContext, 'res'> & {
    res: NextApiResponse;
}): Promise<ContentProps | void> => {
    // the req/res objects are undefined on the client-side
    if (!res || !req) {
        const pageProps = getClientsideProps(asPath);
        return pageProps || makeErrorProps(asPath, 'Unknown client-side error');
    }

    if (asPath && shouldFetchFromFailoverApp(asPath)) {
        const failoverHtml = await fetchFailoverHtml(asPath);
        if (failoverHtml) {
            return res.status(200).send(failoverHtml);
        }
    }

    const errorId = uuid();
    const errorContent = parseErrorContent(err, asPath);

    if (errorContent?.type === ContentType.Error) {
        res.statusCode = errorContent.data.errorCode || 500;
        logPageLoadError(
            errorId,
            `Error on path ${asPath} - ${errorContent.data.errorCode} ${errorContent.data.errorMessageInternal}`
        );
        return errorContent;
    }

    const errorMsg = err?.toString() || 'Empty error message';

    logPageLoadError(
        errorId,
        `Unhandled error on path ${asPath} - ${res.statusCode} [${req.method}] ${errorMsg}`
    );

    return makeErrorProps(asPath, errorMsg, res.statusCode, errorId);
};

export default ErrorComponent;
