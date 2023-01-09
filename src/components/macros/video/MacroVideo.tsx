import React, { useEffect } from 'react';
import { MacroVideoProps } from 'types/macro-props/video';
import { parse } from 'querystring';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import style from './MacroVideo.module.scss'

export const MacroVideo = ({ config }: MacroVideoProps) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//play2.qbrick.com/framework/GoBrain.min.js";
        script.async = true;
        document.body.appendChild(script);

        //HACK for logge start av video, vil bare fungere for initiell start av video
        const player = document.querySelector('.gobrain-play');
        if ( player ) {
            player.addEventListener('click', () => {
                logAmplitudeEvent( AnalyticsEvents.VIDEO_START );
            });
        }

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    if (!config?.video) {
        return null;
    }

    const { video } = config.video;
    const params = parse(video);
    const mediaId = params?.mediaId;
    return (
        <div id='divPageContainer' className={style.macroVideo}>
            <div id='divPlayerContainer'>
                <div data-gobrain-widgetid='player'
                     data-gobrain-config='//video.qbrick.com/play2/api/v1/accounts/763558/configurations/default'
                     data-gobrain-data={`//video.qbrick.com/api/v1/public/accounts/763558/medias/${mediaId}`}
                     data-gobrain-modulesettings='{"Controls":{"download":{"enabled":true},"sharing":{"enabled":true}}}'
                >
                </div>
            </div>
        </div>
    );
};
