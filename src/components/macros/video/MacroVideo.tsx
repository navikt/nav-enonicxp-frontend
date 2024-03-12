import React, { useCallback, useEffect, useId, useState } from 'react';
import { MacroVideoProps } from 'types/macro-props/video';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import {
    findImageUrlFromVideoMeta,
    findVideoDurationFromMeta,
    buildVideoMeta,
} from './videoHelpers';
import { fetchJson } from 'srcCommon/fetch-utils';
import { logger } from 'srcCommon/logger';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { QbrickVideo } from '../../_common/qbrick-video/QbrickVideo';

const PLAYER_TIMEOUT_MS = 5000;
const PLAYER_POLLING_RATE_MS = 50;

export const MacroVideo = ({ config }: MacroVideoProps) => {
    const videoMeta = buildVideoMeta(config?.video, contentLanguage);

    if (!videoMeta) {
        return <EditorHelp type={'error'} text={'Ugyldig video macro'} />;
    }

    const {
        accountId,
        mediaId,
        title,
        duration,
        poster,
        language: videoLanguage,
    } = videoMeta;

    const getVideoMetaFromQbrick = useCallback(async () => {
        const metaUrl = `https://video.qbrick.com/api/v1/public/accounts/${accountId}/medias/${mediaId}`;

        try {
            const result = await fetchJson(metaUrl);
            if (!result) {
                return;
            }

            const poster = findImageUrlFromVideoMeta(result);
            const duration = findVideoDurationFromMeta(result);

            setVideoMeta({ ...videoMeta, poster, duration });
        } catch (e) {
            logger.error(e);
            setIsPlayerError(true);
        }
    }, [accountId, mediaId, videoMeta]);

    useEffect(() => {
        setVideoMeta(buildVideoMeta(config?.video, contentLanguage));
        return resetPlayerState;
    }, [pageId, resetPlayerState, config, contentLanguage]);

    return <QbrickVideo videoMeta={} />;
};
