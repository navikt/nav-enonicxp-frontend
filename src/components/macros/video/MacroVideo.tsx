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
    const mediaId = params?.mediaId;
    return (
        <>
            <div className={`${style.macroVideo}`}>
                <div id="divPageContainer" className={style.macroVideo}>
                    <div id="divPlayerContainer">
                        <div
                            data-gobrain-widgetid="player"
                            data-gobrain-config="//video.qbrick.com/play2/api/v1/accounts/763558/configurations/default"
                            data-gobrain-data={`//video.qbrick.com/api/v1/public/accounts/763558/medias/${mediaId}`}
                            data-gobrain-modulesettings='{"Controls":{"download":{"enabled":true},"sharing":{"enabled":true}}}'
                        ></div>
                    </div>
                </div>
            </div>
            <figure
                className={`${style.figure}`}
                onClick={() => setIsClicked(true)}
            >
                <img
                    className={style.previewImage}
                    src="https://eb5c686abfd0ac2c5fae39833b9cd350-httpcache0-15227-cachedown0.dna.ip-only.net/15227-cachedown0/assets/2018-09-04/daf2f6bd-00015227/daf2f6bd-00015227725.jpg"
                    alt=""
                />
                <figcaption>
                    <BodyShort className={style.text}>
                        Se video "{title}"
                    </BodyShort>
                    <Detail className={style.text}>
                        Varighet er 02.33 minutter
                    </Detail>
                </figcaption>
            </figure>
        </>
    );
};
