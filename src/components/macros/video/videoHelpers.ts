import { parse } from 'querystring';
import { MacroVideoProps, VideoMeta } from 'types/macro-props/video';
import { QbrickMeta } from 'types/qbrickMeta';

type VideoConfig = MacroVideoProps['config']['video'];

export const buildVideoMeta = (
    video: VideoConfig,
    contentLanguage: string
): VideoMeta => {
    if (!video) {
        return {
            accountId: null,
            mediaId: null,
            duration: 0,
            poster: null,
            title: null,
        };
    }

    // For now, support legacy video with only the URL to go after.
    if (!video.targetContent) {
        const query = parse(video?.video?.split('?')[1]);

        return {
            accountId: query?.accountId as string,
            title: video.title,
            duration: null,
            mediaId: query?.mediaId as string,
            poster: null,
            language: query?.language as string,
        };
    }

    return {
        accountId: video.targetContent.data.accountId,
        mediaId: video.targetContent.data.mediaId,
        duration: video.targetContent.data.duration,
        poster: video.targetContent.data.poster?.mediaUrl,
        title: video.targetContent.data.title,
        language: getValidSubtitleLanguage(contentLanguage, video),
    };
};

export const findImageUrlFromVideoMeta = (qbrickMediaData: QbrickMeta) => {
    const resources = qbrickMediaData?.asset?.resources;
    if (!resources) {
        return null;
    }

    const qBrickPickedThumbnail =
        qbrickMediaData.thumbnails && qbrickMediaData.thumbnails[0]?.id;

    let image = resources.find(
        (resource) =>
            resource.type === 'image' && resource.id === qBrickPickedThumbnail
    );

    // No specific thumbnail picked in the Qbrick UI, so find the first image possible
    if (!image) {
        image = resources.find((resource) => resource.type === 'image');
    }

    if (!image) {
        return null;
    }

    const imageLink = image.renditions[0]?.links[0]?.href;

    return imageLink || null;
};

export const findVideoDurationFromMeta = (qbrickMediaData: QbrickMeta) => {
    const resources = qbrickMediaData?.asset?.resources;
    if (!resources) {
        return 0;
    }

    const firstFoundResource = resources.find(
        (resource) => resource.type === 'video'
    );
    const firstFoundVideo =
        firstFoundResource && firstFoundResource.renditions[0]?.videos;
    const duration = firstFoundVideo && firstFoundVideo[0]?.duration;

    return duration || 0;
};

export const getTimestampFromDuration = (duration: number) => {
    const halfMinute = 30;
    const roundedSeconds = Math.round(duration / halfMinute) * halfMinute;
    const minutes = Math.floor(roundedSeconds / 60);
    if (roundedSeconds % 60 === 0) {
        return minutes;
    } else {
        const decimalMinutes = (roundedSeconds % 60) / 60;
        return (minutes + decimalMinutes).toFixed(1).replace('.', ',');
    }
};

// Ensure 'nb' (norsk bokmål) and 'no' (norsk) are treated as equal;
const transformLanguage = (language: string) =>
    language === 'no' ? 'nb' : language;

const getValidSubtitleLanguage = (
    contentLanguage: string,
    video: VideoConfig
) => {
    const { language: macroLanguage, targetContent } = video;
    const subtitles = targetContent?.data?.subtitles;

    if (!subtitles) {
        return undefined;
    }

    const selectedLanguage = transformLanguage(
        macroLanguage || contentLanguage
    );

    return subtitles.find(
        (language) => transformLanguage(language) === selectedLanguage
    );
};
