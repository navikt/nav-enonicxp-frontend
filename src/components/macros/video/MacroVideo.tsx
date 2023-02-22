import React, { useEffect, useState } from 'react';
import { MacroVideoProps } from 'types/macro-props/video';
import { parse } from 'querystring';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { BodyShort, Button, Detail, Label } from '@navikt/ds-react';
import style from './MacroVideo.module.scss';

export const MacroVideo = ({ config }: MacroVideoProps) => {
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
                console.log(document.querySelector('.gobrain-poster'));
                // document
                //     .getElementById('tester')
                //     .appendChild(document.querySelector('.gobrain-poster'));
                // setPreviewImageUrl(qbrickImageUrl);
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

    if (!config?.video) {
        return null;
    }

    console.log(config);

    const { video, title } = config.video;
    const params = parse(video);
    const mediaId = params?.mediaId;

    return (
        <div suppressHydrationWarning id="tester" className={style.wrapper}>
            <Button
                className={`${style.button} ${isClicked ? style.hidden : ''}`}
                variant="tertiary-neutral"
                onClick={() => setIsClicked(true)}
                icon={
                    <div className={style.iconWrapper}>
                        <img
                            className={style.previewImage}
                            // src={previewImageUrl}
                            src="https://delicate-sunburst-edd62f.netlify.app/images/forbedre-okonomi.jpg"
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
                <Label
                    as="p"
                    className={style.text}
                >{`Se video "${title}"`}</Label>
                <Detail className={`${style.text} ${style.videoLength}`}>
                    {/* {previewVideoLength} */}
                    Varighet er 02:07
                </Detail>
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
                <script
                    src="https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js"
                    async
                />
            </div>
        </div>
    );
};
