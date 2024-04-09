import { parse } from 'querystring';
import { VideoData } from 'types/content-props/video';

export type QbrickVideoProps = {
    accountId: string;
    mediaId: string;
    title: string;
    duration: number;
    poster?: string;
    language?: string;
};

export const buildQbrickVideoProps = (videoData: VideoData, language: string): QbrickVideoProps => {
    const { accountId, mediaId, poster, duration, title, subtitles } = videoData;

    return {
        accountId,
        mediaId,
        title,
        duration,
        poster: poster?.mediaUrl,
        language: getSubtitlesLanguage(language, subtitles),
    };
};

export const buildQbrickVideoPropsLegacy = (
    title?: string,
    url?: string
): QbrickVideoProps | null => {
    if (!title || !url) {
        return null;
    }

    const query = parse(url.split('?')[1]);
    if (!query) {
        return null;
    }

    const { accountId, mediaId, language } = query as Partial<QbrickVideoProps>;
    if (!accountId || !mediaId) {
        return null;
    }

    return {
        accountId,
        title,
        mediaId,
        language,
        duration: 0,
        poster: undefined,
    };
};

const getSubtitlesLanguage = (language: string, subtitles: VideoData['subtitles']) => {
    if (!subtitles) {
        return undefined;
    }

    const selectedLanguage = transformLanguage(language);

    return subtitles.find((language) => transformLanguage(language) === selectedLanguage);
};

// Ensure 'nb' (norsk bokmål) and 'no' (norsk) are treated as equal;
const transformLanguage = (language: string) => (language === 'no' ? 'nb' : language);
