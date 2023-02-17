import React, { useEffect, useState } from 'react';
import { MacroVideoProps } from 'types/macro-props/video';
import { parse } from 'querystring';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { BodyShort, Button, Detail } from '@navikt/ds-react';
import style from './MacroVideo.module.scss';

export const MacroVideo = ({ config }: MacroVideoProps) => {
    if (!config?.video) {
        return null;
    }

    const [isClicked, setIsClicked] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [previewVideoLength, setPreviewVideoLength] = useState('');

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const qbrickImageUrl = document
                .querySelector('.gobrain-poster')
                ?.getAttribute('style')
                ?.match(/"([^"]+)"/)[1];

            const qbrickVideoDuration =
                document.querySelector('.gobrain-duration')?.innerHTML;

            if (qbrickImageUrl) {
                setPreviewImageUrl(qbrickImageUrl);
            }
            if (qbrickVideoDuration) {
                setPreviewVideoLength(qbrickVideoDuration);
            }
            if (qbrickImageUrl && qbrickVideoDuration) {
                observer.disconnect();
            }
        });

        const target = document.getElementById('playerContainer');
        observer.observe(target, { childList: true, subtree: true });
    }, []);

    useEffect(() => {
        if (isClicked) {
            const qbrickPlayButton = document.querySelector('.gobrain-play');
            (qbrickPlayButton as HTMLElement)?.click();
            logAmplitudeEvent(AnalyticsEvents.VIDEO_START);
        }
    }, [isClicked]);

    const { video, title } = config.video;
    const params = parse(video);
    const mediaId = params?.mediaId;

    return (
        <div suppressHydrationWarning>
            <Button
                className={`${style.previewButton} ${
                    isClicked ? style.hidden : ''
                }`}
                variant="tertiary-neutral"
                onClick={() => setIsClicked(true)}
                icon={
                    <img
                        className={style.previewImage}
                        src={previewImageUrl}
                        alt=""
                    />
                }
            >
                <BodyShort
                    className={style.text}
                >{`Se video "${title}"`}</BodyShort>
                <Detail className={style.text}>{previewVideoLength}</Detail>
            </Button>
            <div id="playerContainer">
                <div
                    className={`${style.macroVideo} ${
                        isClicked ? '' : style.hidden
                    }`}
                    title={title}
                    data-gobrain-widgetid="player"
                    // data-gobrain-language="en"
                    // data-gobrain-autoplay="true"
                    // data-gobrain-repeat="false"
                    // data-gobrain-modulesettings='{"TopControls":{"download":{"enabled":false},"sharing":{"enabled":true}},"MobileControls":{"download":{"enabled":false},"sharing":{"enabled":true}}}'
                    data-gobrain-config="https://video.qbrick.com/play2/api/v1/accounts/763558/configurations/qbrick-player"
                    data-gobrain-data={`https://video.qbrick.com/api/v1/public/accounts/763558/medias/${mediaId}`}
                />
                <script src="https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js"></script>
            </div>
        </div>
    );
};
