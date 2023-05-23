import React, { useEffect, useState } from 'react';
import { MacroVideoProps, VideoMeta } from 'types/macro-props/video';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { Button, Detail, Label } from '@navikt/ds-react';
import { getMediaUrl } from 'utils/urls';
import {
    findImageUrlFromVideoMeta,
    findVideoDurationFromMeta,
    getTimestampFromDuration,
    buildVideoMeta,
} from './videoHelpers';

import { useExternalScript } from 'utils/useExternalScript';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import style from './MacroVideo.module.scss';

export const MacroVideo = ({ config }: MacroVideoProps) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [videoMeta, setVideoMeta] = useState<VideoMeta>(
        buildVideoMeta(config.video)
    );
    const videoRef = React.useRef(null);

    const { language } = usePageConfig();
    const translations = translator('macroVideo', language);

    const scriptState = useExternalScript(
        '//play2.qbrick.com/qbrick-player/framework/GoBrain.min.js'
    );

    useEffect(() => {
        if (isVideoOpen) {
            const qbrickPlayButton =
                videoRef.current.querySelector('.gobrain-play');
            qbrickPlayButton?.click();

            logAmplitudeEvent(AnalyticsEvents.VIDEO_START);
        }
    }, [isVideoOpen]);

    useEffect(() => {
        // Wether the video is in new content or legacy, attempt
        // to get the poster and duration if none is given in the content config.
        if (!videoMeta.poster && !videoMeta.duration) {
            getVideoMetaFromQbrick();
        }
    }, [videoMeta.poster, videoMeta.duration]);

    const getVideoMetaFromQbrick = async () => {
        const metaUrl = `https://video.qbrick.com/api/v1/public/accounts/${accountId}/medias/${mediaId}`;

        try {
            const result = await fetch(metaUrl);
            const json = await result.json();
            const image = findImageUrlFromVideoMeta(json);
            const duration = findVideoDurationFromMeta(json);

            setVideoMeta({ ...videoMeta, poster: image, duration });
        } catch (e) {
            console.error(e);
        }
    };

    if (!videoMeta) {
        return null;
    }

    const { accountId, mediaId, title, duration, poster } = videoMeta;

    const durationAsString = getTimestampFromDuration(duration);
    const imageUrl =
        poster?.slice(0, 4) === 'http' ? poster : getMediaUrl(poster);

    if (scriptState !== 'ready') {
        return null;
    }

    return (
        <div className={style.wrapper}>
            <Button
                className={`${style.button} ${isVideoOpen ? style.hidden : ''}`}
                variant="tertiary"
                onClick={() => setIsVideoOpen(true)}
                icon={
                    <div className={style.posterWrapper}>
                        <img
                            className={style.previewImage}
                            src={imageUrl}
                            alt=""
                        />
                        <svg
                            className={style.playIcon}
                            focusable="false"
                            aria-hidden="true"
                            width="22"
                            height="26"
                            viewBox="0 0 22 26"
                        >
                            <path fill="#fff" d="M22 13 0 26V0Z" />
                        </svg>
                    </div>
                }
            >
                <Label as="p" className={style.text}>
                    {translations('playMovie')} {title}
                </Label>
                {duration > 0 && (
                    <Detail className={`${style.text} ${style.videoLength}`}>
                        {translations('duration')} {durationAsString}{' '}
                        {translations('minutes')}
                    </Detail>
                )}
            </Button>
            <div
                className={`${style.macroVideo} ${
                    isVideoOpen ? '' : style.hidden
                }`}
            >
                <div
                    ref={videoRef}
                    title={title}
                    data-gobrain-config={`//video.qbrick.com/play2/api/v1/accounts/${accountId}/configurations/qbrick-player`}
                    data-gobrain-data={`//video.qbrick.com/api/v1/public/accounts/${accountId}/medias/${mediaId}`}
                />
            </div>
        </div>
    );
};
