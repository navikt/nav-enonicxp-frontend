import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { isContentTypeImplemented } from '../components/ContentMapper';
import { error1337ReloadProps } from '../components/pages/error-page/errorcode-content/ErrorContent1337';
import { stripLineBreaks } from './string';
import { fetchWithTimeout } from './fetch-utils';
import { stripXpPathPrefix, xpServiceUrl } from './urls';
import { redirectProps } from '../components/PageBase';

export const logPageLoadError = (errorId: string, message: string) =>
    console.error(`[Page load error] ${errorId} - ${stripLineBreaks(message)}`);

const isEmptyMainArticleChapter = (content: ContentProps) =>
    content.__typename === ContentType.MainArticleChapter &&
    !content.data?.article;

export const isNotFound = (content: ContentProps) => {
    return (
        (content.__typename === ContentType.Error &&
            content.data.errorCode === 404) ||
        !isContentTypeImplemented(content) ||
        isEmptyMainArticleChapter(content)
    );
};

// These status codes may indicate that the requested page has been intentionally
// made unavailable.  We want to perform cache revalidation in these cases.
const revalidateOnErrorCode = {
    404: true, // not found
};

const appError = (content: ContentProps) => ({
    content,
});

export const errorHandler = async (content: ContentProps) => {
    const path = content.data.customPath || stripXpPathPrefix(content._path);

    return redirectProps(`${path}?failover=true`, false);

    // if (
    //     process.env.IS_FAILOVER ||
    //     !revalidateOnErrorCode[content.data.errorCode]
    // ) {
    //     throw appError(content);
    // }

    // const path = content.data.customPath || stripXpPathPrefix(content._path);
    // const url = `${process.env.FAILOVER_ORIGIN}${path}`;
    //
    // const failoverContent = await fetchWithTimeout(url, 5000)
    //     .then((res) => {
    //         if (res.ok) {
    //             return res.text();
    //         }
    //
    //         console.error(`Bad response from failover`);
    //         return null;
    //     })
    //     .catch((e) => {
    //         console.error(`Failback error: ${e}`);
    //         return null;
    //     });

    // console.log(`Failover result: ${failoverContent}`);

    // if (failoverContent) {
    //     return;
    // }

    // return { props: { content } };
};
