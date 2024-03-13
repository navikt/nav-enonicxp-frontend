import { parse } from 'querystring';
import { MacroVideoProps } from '../../../types/macro-props/video';
import { QbrickMeta } from '../../../types/qbrickMeta';

type VideoConfig = MacroVideoProps['config']['video'];

const buildLegacyVideoMeta = (videoConfig: VideoConfig): VideoMeta | null => {
    const { title, video } = videoConfig;

    if (!video || !title) {
        return null;
    }

    const query = parse(video.split('?')[1]);
    if (!query) {
        return null;
    }

    const { accountId, mediaId, language } = query as Partial<VideoMeta>;
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

export const buildVideoMeta = (
    videoConfig: VideoConfig,
    contentLanguage: string
): VideoMeta | null => {
    if (!videoConfig) {
        return null;
    }

    const { targetContent } = videoConfig;

    // For now, support legacy video with only the URL to go after.
    if (!targetContent) {
        return buildLegacyVideoMeta(videoConfig);
    }

    return {
        accountId: targetContent.data.accountId,
        mediaId: targetContent.data.mediaId,
        duration: targetContent.data.duration,
        poster: targetContent.data.poster?.mediaUrl,
        title: targetContent.data.title,
        language: getValidSubtitleLanguage(contentLanguage, videoConfig),
    };
};

export const findImageUrlFromVideoMeta = (qbrickMediaData: QbrickMeta) => {
    const resources = qbrickMediaData?.asset?.resources;
    if (!resources) {
        return undefined;
    }

    const images = resources.filter((resource) => resource.type === 'image');

    const qBrickPickedThumbnail =
        qbrickMediaData.thumbnails && qbrickMediaData.thumbnails[0]?.id;

    // If the specified thumbnail is not found, pick the first image
    const selectedImage =
        (qBrickPickedThumbnail &&
            images.find((resource) => resource.id === qBrickPickedThumbnail)) ||
        images[0];

    if (!selectedImage) {
        return undefined;
    }

    const imageHref = selectedImage.renditions[0]?.links[0]?.href;

    return imageHref || undefined;
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
