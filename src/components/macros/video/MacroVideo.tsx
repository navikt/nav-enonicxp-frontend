import React, { useEffect, useState } from 'react';
import { MacroVideoProps } from 'types/macro-props/video';
import { parse } from 'querystring';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { BodyShort, Detail } from '@navikt/ds-react';
import style from './MacroVideo.module.scss';

export const MacroVideo = ({ config }: MacroVideoProps) => {
    const [isClicked, setIsClicked] = useState(false);

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = '//play2.qbrick.com/framework/GoBrain.min.js';
    //     script.async = true;
    //     document.body.appendChild(script);

    //     //HACK for logge start av video, vil bare fungere for initiell start av video
    //     const player = document.querySelector('.gobrain-play');
    //     console.log(player);
    //     if (player) {
    //         player.addEventListener('click', () => {
    //             logAmplitudeEvent(AnalyticsEvents.VIDEO_START);
    //         });
    //     }

    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);

    useEffect(() => {
        if (isClicked) {
            console.log('click');

            const player = document.querySelector(
                '.gobrain-play'
            ) as HTMLElement;
            if (player) {
                console.log(player);
                player.click();
            }
        }
    }, [isClicked]);

    if (!config?.video) {
        return null;
    }

    const { video, title } = config.video;
    const params = parse(video);
    console.log(params);

    const mediaId = params?.mediaId;
    return (
        <>
            <div
                className={`${style.macroVideo} ${
                    isClicked ? '' : style.hidden
                }`}
                title="Video: Er du en Naver?_Høydeformat"
                data-gobrain-widgetid="player"
                // data-gobrain-language="en"
                // data-gobrain-autoplay="true"
                data-gobrain-repeat="false"
                data-gobrain-modulesettings='{"TopControls":{"download":{"enabled":false},"sharing":{"enabled":true}},"MobileControls":{"download":{"enabled":false},"sharing":{"enabled":true}}}'
                data-gobrain-config="https://video.qbrick.com/play2/api/v1/accounts/763558/configurations/qbrick-player"
                data-gobrain-data={`https://video.qbrick.com/api/v1/public/accounts/763558/medias/${mediaId}`}
            ></div>
            <script src="https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js"></script>
            <figure
                className={`${style.figure} ${isClicked ? style.hidden : ''}`}
                onClick={() => setIsClicked(true)}
            >
                <img
                    className={style.previewImage}
                    src="https://eb5c686abfd0ac2c5fae39833b9cd350-httpcache0-15227-cachedown0.dna.ip-only.net/15227-cachedown0/assets/2018-09-04/daf2f6bd-00015227/daf2f6bd-00015227725.jpg"
                    alt=""
                />
                <figcaption>
                    <BodyShort className={style.text}>
                        Se video {title}
                    </BodyShort>
                    <Detail className={style.text}>
                        Varighet er 02.33 minutter
                    </Detail>
                </figcaption>
            </figure>
        </>
    );
};
