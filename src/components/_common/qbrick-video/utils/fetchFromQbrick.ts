import { fetchJson } from 'srcCommon/fetch-utils';
import {
    findImageUrlFromVideoMeta,
    findVideoDurationFromMeta,
} from '../videoHelpers';
import { logger } from 'srcCommon/logger';
import { QbrickVideoProps } from './types';

type Props = {
    accountId: string;
    mediaId: string;
};

export const fetchVideoMeta = ({
    accountId,
    mediaId,
}: Props): QbrickVideoProps | null => {
    const metaUrl = `https://video.qbrick.com/api/v1/public/accounts/${accountId}/medias/${mediaId}`;

    try {
        const result = await fetchJson(metaUrl);
        if (!result) {
            return null;
        }

        const poster = findImageUrlFromVideoMeta(result);
        const duration = findVideoDurationFromMeta(result);

        setVideoMeta({ ...videoMeta, poster, duration });
    } catch (e) {
        logger.error(e);
        setIsPlayerError(true);
    }
};
