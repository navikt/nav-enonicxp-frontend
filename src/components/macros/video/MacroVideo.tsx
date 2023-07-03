import React, { useEffect, useState } from 'react';
import { MacroVideoProps, VideoMeta } from 'types/macro-props/video';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { Button, Detail, Label, Loader } from '@navikt/ds-react';
import { getMediaUrl } from 'utils/urls';
import {
    findImageUrlFromVideoMeta,
    findVideoDurationFromMeta,
    getTimestampFromDuration,
    buildVideoMeta,
    getValidSubtitleLanguage,
} from './videoHelpers';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { fetchJson } from 'utils/fetch/fetch-utils';
import Script from 'next/script';
import { classNames } from 'utils/classnames';

import style from './MacroVideo.module.scss';

const PLAYER_TIMEOUT_MS = 5000;
const PLAYER_POLLING_RATE_MS = 50;

export const MacroVideo = ({ config }: MacroVideoProps) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [videoMeta, setVideoMeta] = useState<VideoMeta>(
        buildVideoMeta(config?.video)
    );
    const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

    const videoRef = React.useRef(null);

    const { language, pageConfig } = usePageConfig();
    const { editorView } = pageConfig;
    const translations = translator('macroVideo', language);
    const { accountId, mediaId, title, duration, poster } = videoMeta;

    console.log(accountId, mediaId, isPlayerLoaded);

    const getVideoMetaFromQbrick = async () => {
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
        }
    };

    const pollPlayerState = (timeLeft = PLAYER_TIMEOUT_MS) => {
        // console.log(mediaId, isPlayerLoaded);
        if (isPlayerLoaded) {
            return;
        }

        if (window.GoBrain) {
            window.GoBrain.create(videoRef.current, {
                config: `//video.qbrick.com/play2/api/v1/accounts/${accountId}/configurations/qbrick-player`,
                data: `//video.qbrick.com/api/v1/public/accounts/${accountId}/medias/${mediaId}`,
                language: getValidSubtitleLanguage(language, config.video),
            }).on('ready', () => {
                setIsPlayerLoaded(true);
                console.log('Loaded', mediaId);
            });
            return;
        }

        if (timeLeft <= 0) {
            console.error('Failed to load QBrick player - Timed out');
            return;
        }

        setTimeout(
            () => pollPlayerState(timeLeft - PLAYER_POLLING_RATE_MS),
            PLAYER_POLLING_RATE_MS
        );
    };

    useEffect(() => {
        if (isVideoOpen) {
            const qbrickPlayButton =
                videoRef.current.querySelector('.gobrain-play');
            qbrickPlayButton?.click();

            logAmplitudeEvent(AnalyticsEvents.VIDEO_START);
        }
    }, [isVideoOpen]);

    useEffect(() => {
        // Whether the video is in new content or legacy, attempt
        // to get the poster and duration if none is given in the content config.
        if (!videoMeta.poster && !videoMeta.duration) {
            getVideoMetaFromQbrick();
        }
    }, [videoMeta.poster, videoMeta.duration]);

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
                onReady={() => {
                    console.log('Ready', mediaId);
                    pollPlayerState();
                }}
                onError={(e) => {
                    console.log('error', mediaId, e);
                }}
            />
            {!isPlayerLoaded && <Loader />}
            <Button
                className={classNames(
                    style.button,
                    (!isPlayerLoaded || isVideoOpen) && style.hidden
                )}
                variant={'tertiary'}
                onClick={() => editorView !== 'edit' && setIsVideoOpen(true)}
                icon={
                    <div className={style.posterWrapper}>
                        <img
                            className={style.previewImage}
                            src={imageUrl}
                            alt={''}
                        />
                        <svg
                            className={style.playIcon}
                            focusable={'false'}
                            aria-hidden={'true'}
                            width={'22'}
                            height={'26'}
                            viewBox={'0 0 22 26'}
                        >
                            <path fill={'#fff'} d={'M22 13 0 26V0Z'} />
                        </svg>
                    </div>
                }
            >
                <Label as={'p'} className={style.text}>
                    {translations('playMovie')} {title}
                </Label>
                {duration > 0 && (
                    <Detail
                        className={classNames(style.text, style.videoLength)}
                    >
                        {translations('duration')}
                        {durationAsString} {translations('minutes')}
                    </Detail>
                )}
            </Button>
            <div
                className={classNames(
                    style.macroVideo,
                    (!isPlayerLoaded || !isVideoOpen) && style.hidden
                )}
                ref={videoRef}
                title={title}
            />
        </div>
    );
};
