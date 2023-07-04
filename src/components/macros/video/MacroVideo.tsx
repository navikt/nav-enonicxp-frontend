import React, { useCallback, useEffect, useId, useState } from 'react';
import { MacroVideoProps, VideoMeta } from 'types/macro-props/video';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { Button, Detail, Label, Loader } from '@navikt/ds-react';
import { getMediaUrl } from 'utils/urls';
import {
    findImageUrlFromVideoMeta,
    findVideoDurationFromMeta,
    getTimestampFromDuration,
    buildVideoMeta,
} from './videoHelpers';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { fetchJson } from 'utils/fetch/fetch-utils';
import Script from 'next/script';
import { classNames } from 'utils/classnames';
import { AlertBox } from 'components/_common/alert-box/AlertBox';

import style from './MacroVideo.module.scss';

const PLAYER_TIMEOUT_MS = 5000;
const PLAYER_POLLING_RATE_MS = 50;

export const MacroVideo = ({ config }: MacroVideoProps) => {
    const { language: contentLanguage, pageConfig } = usePageConfig();
    const { editorView, pageId } = pageConfig;
    const translations = translator('macroVideo', contentLanguage);

    const [videoMeta, setVideoMeta] = useState<VideoMeta>(
        buildVideoMeta(config?.video, contentLanguage)
    );

    const [isPlayerLoading, setIsPlayerLoading] = useState(false);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isPlayerError, setIsPlayerError] = useState(false);

    const videoRef = React.useRef(null);

    const widgetId = useId();

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

            const image = findImageUrlFromVideoMeta(result);
            const duration = findVideoDurationFromMeta(result);

            setVideoMeta({ ...videoMeta, poster: image, duration });
        } catch (e) {
            console.error(e);
            setIsPlayerError(true);
        }
    }, [accountId, mediaId, videoMeta]);

    const createAndStartPlayer = useCallback(
        (timeLeft = PLAYER_TIMEOUT_MS) => {
            if (timeLeft <= 0) {
                console.error('Failed to load QBrick player - Timed out');
                setIsPlayerError(true);
                return;
            }

            // Should be defined when the GoBrain init script has finished executing
            // There doesn't seem to be an elegant way to consistently determine when
            // this has happened, so we do some polling...
            if (!window.GoBrain) {
                setTimeout(
                    () =>
                        createAndStartPlayer(timeLeft - PLAYER_POLLING_RATE_MS),
                    PLAYER_POLLING_RATE_MS
                );
                return;
            }

            const widgetExists = !!window.GoBrain.widgets(widgetId);
            if (widgetExists) {
                return;
            }

            window.GoBrain.create(videoRef.current, {
                config: `//video.qbrick.com/play2/api/v1/accounts/${accountId}/configurations/qbrick-player`,
                data: `//video.qbrick.com/api/v1/public/accounts/${accountId}/medias/${mediaId}`,
                language: videoLanguage,
                autoplay: true,
                widgetId,
            }).on('ready', () => {
                setIsPlayerReady(true);
                setIsPlayerLoading(false);
                logAmplitudeEvent(AnalyticsEvents.VIDEO_START);
            });
        },
        [widgetId, accountId, mediaId, videoLanguage]
    );

    const resetPlayerState = useCallback(() => {
        setIsPlayerReady(false);
        setIsPlayerError(false);

        if (window.GoBrain) {
            window.GoBrain.destroy(widgetId, true);
        }
    }, [widgetId]);

    useEffect(() => {
        // Whether the video is in new content or legacy, attempt
        // to get the poster and duration if none is given in the content config.
        if (!videoMeta.poster && !videoMeta.duration) {
            getVideoMetaFromQbrick();
        }
    }, [videoMeta.poster, videoMeta.duration, getVideoMetaFromQbrick]);

    useEffect(() => {
        setVideoMeta(buildVideoMeta(config?.video, contentLanguage));
        return resetPlayerState;
    }, [pageId, resetPlayerState, config, contentLanguage]);

    if (!accountId) {
        return null;
    }

    const durationAsString = getTimestampFromDuration(duration);
    const imageUrl = poster?.startsWith('http') ? poster : getMediaUrl(poster);

    return (
        <div className={style.wrapper}>
            <Script
                src={
                    'https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js'
                }
                async={true}
                onError={() => {
                    setIsPlayerError(true);
                }}
            />
            <Button
                className={classNames(
                    style.button,
                    isPlayerReady && style.hidden
                )}
                variant={'tertiary'}
                onClick={() => {
                    if (editorView !== 'edit' && !isPlayerLoading) {
                        setIsPlayerLoading(true);
                        createAndStartPlayer();
                    }
                }}
                icon={
                    <div className={style.posterWrapper}>
                        <img
                            className={style.previewImage}
                            src={imageUrl}
                            alt={''}
                        />
                        {isPlayerLoading ? (
                            <Loader className={style.icon} />
                        ) : (
                            <svg
                                className={style.icon}
                                focusable={'false'}
                                aria-hidden={'true'}
                                width={'22'}
                                height={'26'}
                                viewBox={'0 0 22 26'}
                            >
                                <path fill={'#fff'} d={'M22 13 0 26V0Z'} />
                            </svg>
                        )}
                    </div>
                }
            >
                <Label as={'p'} className={style.text}>
                    {`${translations('playMovie')} ${title}`}
                </Label>
                {duration > 0 && (
                    <Detail
                        className={classNames(style.text, style.videoLength)}
                    >
                        {`${translations(
                            'duration'
                        )} ${durationAsString} ${translations('minutes')}`}
                    </Detail>
                )}
            </Button>
            {isPlayerError && (
                <AlertBox variant={'error'}>{translations('error')}</AlertBox>
            )}
            <div
                className={classNames(
                    style.macroVideo,
                    !isPlayerReady && style.hidden
                )}
                ref={videoRef}
                title={title}
            />
        </div>
    );
};
