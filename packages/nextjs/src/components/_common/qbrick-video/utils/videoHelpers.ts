import { fetchJson } from '@/shared/fetch-utils';
import { QbrickMeta } from 'types/qbrickMeta';
import { QbrickVideoProps } from './videoProps';

const findImageUrlFromVideoMeta = (qbrickMediaData: QbrickMeta) => {
    const resources = qbrickMediaData?.asset?.resources;
    if (!resources) {
        return undefined;
    }

    const images = resources.filter((resource) => resource.type === 'image');

    const qBrickPickedThumbnail = qbrickMediaData.thumbnails && qbrickMediaData.thumbnails[0]?.id;

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

const findVideoDurationFromMeta = (qbrickMediaData: QbrickMeta) => {
    const resources = qbrickMediaData?.asset?.resources;
    if (!resources) {
        return 0;
    }

    const firstFoundResource = resources.find((resource) => resource.type === 'video');
    const firstFoundVideo = firstFoundResource && firstFoundResource.renditions[0]?.videos;
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

export const fetchQbrickMissingProps = async (
    videoProps: QbrickVideoProps
): Promise<QbrickVideoProps | null> => {
    const { accountId, mediaId } = videoProps;

    const metaUrl = `https://video.qbrick.com/api/v1/public/accounts/${accountId}/medias/${mediaId}`;

    const result = await fetchJson(metaUrl);
    if (!result) {
        return null;
    }

    const poster = findImageUrlFromVideoMeta(result);
    const duration = findVideoDurationFromMeta(result);

    return { ...videoProps, poster, duration };
};
