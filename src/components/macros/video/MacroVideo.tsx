import React, { useEffect, useState } from 'react';
import { MacroVideoProps, VideoMeta } from 'types/macro-props/video';
import { parse } from 'querystring';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { Button, Detail, Label } from '@navikt/ds-react';
import style from './MacroVideo.module.scss';
import { getMediaUrl } from 'utils/urls';

export const MacroVideo = ({ config }: MacroVideoProps) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    useEffect(() => {
        if (isVideoOpen) {
            const qbrickPlayButton =
                document.querySelector<HTMLElement>('.gobrain-play');
            qbrickPlayButton?.click();
            logAmplitudeEvent(AnalyticsEvents.VIDEO_START);
        }
    }, [isVideoOpen]);

    const {
        video: legacyVideoUrl,
        title: legacyTitle,
        targetContent,
    } = config.video;

    const { accountId, mediaId, duration, title, poster } =
        targetContent?.data || {};
    const params = parse(legacyVideoUrl);

    const durationAsString = `${Math.floor(duration / 60)}:${duration % 60}`;
    const imageUrl = getMediaUrl(poster?.mediaUrl);

    return (
        <div suppressHydrationWarning id="tester" className={style.wrapper}>
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
                <Label as="p" className={style.text}>{`Se video "${
                    title || legacyTitle
                }"`}</Label>
                {duration && (
                    <Detail className={`${style.text} ${style.videoLength}`}>
                        Varighet er {durationAsString}
                    </Detail>
                )}
            </Button>
            <div id="playerContainer">
                <div
                    className={`${style.macroVideo} ${
                        isVideoOpen ? '' : style.hidden
                    }`}
                    title={title}
                    data-gobrain-widgetid="player"
                    // data-gobrain-language="en"
                    // data-gobrain-autoplay="true"
                    // data-gobrain-repeat="false"
                    // data-gobrain-modulesettings='{"TopControls":{"download":{"enabled":false},"sharing":{"enabled":true}},"MobileControls":{"download":{"enabled":false},"sharing":{"enabled":true}}}'
                    data-gobrain-config={`https://video.qbrick.com/play2/api/v1/accounts/${accountId}/configurations/qbrick-player`}
                    data-gobrain-data={`https://video.qbrick.com/api/v1/public/accounts/${accountId}/medias/${mediaId}`}
                />
                <script
                    src="https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js"
                    async
                />
            </div>
        </div>
    );
};
