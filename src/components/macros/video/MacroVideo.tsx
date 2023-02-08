import { BodyShort, Detail } from '@navikt/ds-react';
import React, { useState } from 'react';
import { MacroVideoProps } from '../../../types/macro-props/video';
import style from './MacroVideo.module.scss';

export const MacroVideo = ({ config }: MacroVideoProps) => {
    const [isClicked, setIsClicked] = useState(false);

    if (!config?.video) {
        return null;
    }
    const { video, title } = config.video;
    return (
        <>
            <div
                className={`${style.macroVideo} ${
                    isClicked ? '' : style.hidden
                }`}
            >
                <iframe
                    title={`Video: ${title}`}
                    src={video}
                    allow={'fullscreen'}
                />
            </div>
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
