import { parse } from 'querystring';
import { MacroVideoProps, VideoMeta } from 'types/macro-props/video';
import { QbrickMeta } from 'types/qbrickMeta';

export const buildVideoMeta = (
    video: MacroVideoProps['config']['video']
): VideoMeta => {
    // For now, support legacy video with only the URL to go after.
    if (!video.targetContent) {
        const query = parse(video?.video?.split('?')[1]);
        return {
            accountId: query?.accountId as string,
            title: video.title,
            duration: null,
            mediaId: query?.mediaId as string,
            poster: null,
        };
    }

    return {
        accountId: video.targetContent?.data.accountId,
        mediaId: video.targetContent?.data.mediaId,
        duration: video.targetContent?.data.duration,
        poster: video.targetContent?.data.poster?.mediaUrl,
        title: video.targetContent?.data.title,
    };
};

export const findImageUrlFromVideoMeta = (qbrickMediaData: QbrickMeta) => {
    console.log(qbrickMediaData);
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

    // No specific thumbnail picked in the Qbrick UI, so use first image
    if (!image) {
        image = resources.find((resource) => resource.type === 'image');
    }

    if (!image) {
        return null;
    }

    const imageLink = image.renditions[0].links[0].href;

    return imageLink || null;
};

export const findVideoDurationFromMeta = (qbrickMediaData: QbrickMeta) => {
    const resources = qbrickMediaData?.asset?.resources;
    if (!resources) {
        return 0;
    }

    const duration = resources.find((resource) => resource.type === 'video')
        .renditions[0].videos[0].duration;

    return duration || 0;
};

export const getTimestampFromDuration = (duration: number) => {
    const halfMinute = 30; // seconds in half a minute
    const roundedSeconds = Math.round(duration / halfMinute) * halfMinute;
    const minutes = Math.floor(roundedSeconds / 60); // convert to whole minutes
    if (roundedSeconds % 60 === 0) {
        return minutes; // return whole number
    } else {
        const decimalMinutes = (roundedSeconds % 60) / 60;
        return (minutes + decimalMinutes).toFixed(1).replace('.', ','); // round to 1 decimal place
    }
};
