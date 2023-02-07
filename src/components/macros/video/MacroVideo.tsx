import React from 'react';
import { MacroVideoProps } from '../../../types/macro-props/video';
import style from './MacroVideo.module.scss';

export const MacroVideo = ({ config }: MacroVideoProps) => {
    if (!config?.video) {
        return null;
    }
    const { video, title } = config.video;
    return (
        // <div className={style.macroVideo}>
        //     <iframe
        //         title={`Video: ${title}`}
        //         src={video}
        //         allow={'fullscreen'}
        //     />
        // </div>

        <figure>
            <div>
                <img
                    src="https://eb5c686abfd0ac2c5fae39833b9cd350-httpcache0-15227-cachedown0.dna.ip-only.net/15227-cachedown0/assets/2018-09-04/daf2f6bd-00015227/daf2f6bd-00015227725.jpg"
                    alt=""
                />
                <div>
                    <svg
                        focusable="false"
                        aria-hidden="true"
                        width="22"
                        height="26"
                        viewBox="0 0 22 26"
                    >
                        <path fill="#fff" d="M22 13 0 26V0Z" />
                    </svg>
                </div>
            </div>
            <figcaption>
                <h4>
                    <button>
                        Se video om budsjett og hva det kan brukes&nbsp;til
                    </button>
                </h4>
                <p>
                    <span>Varighet er 02.33 minutter</span>
                </p>
            </figcaption>
        </figure>
    );
};
