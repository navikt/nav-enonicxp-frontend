import React, { useEffect } from 'react';
import { Button, Detail, Label, Loader } from '@navikt/ds-react';
import { getMediaUrl } from 'utils/urls';
import { getTimestampFromDuration } from './videoHelpers';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import Script from 'next/script';
import { classNames } from 'utils/classnames';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { QbrickVideoProps } from './utils/types';
import { useQbrickPlayerState } from './useQbrickPlayerState';
import { logger } from 'srcCommon/logger';

import style from './QbrickVideo.module.scss';

type Props = QbrickVideoProps;

export const QbrickVideo = (props: Props) => {
    const { language: contentLanguage, pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    const { title, duration, poster } = props;

    const videoRef = React.useRef(null);

    const { createAndStartPlayer, resetPlayer, playerState, setPlayerState } =
        useQbrickPlayerState({
            videoProps: props,
            videoContainer: videoRef.current,
        });

    useEffect(() => {
        return;
    }, []);

    const translations = translator('macroVideo', contentLanguage);

    const durationAsString = getTimestampFromDuration(duration);

    const imageUrl = poster?.startsWith('http')
        ? poster
        : getMediaUrl(poster, !!editorView);

    return (
        <div className={style.wrapper}>
            <Script
                src={
                    'https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js'
                }
                async={true}
                onError={(error) => {
                    logger.error(
                        `Failed to load QBrick player script - ${error}`
                    );
                    setPlayerState('error');
                }}
            />
            <Button
                className={classNames(
                    style.button,
                    playerState === 'ready' && style.hidden
                )}
                variant={'tertiary'}
                onClick={() => {
                    if (editorView !== 'edit') {
                        createAndStartPlayer();
                    }
                }}
                icon={
                    <div className={style.posterWrapper}>
                        <NextImage
                            className={style.previewImage}
                            src={imageUrl}
                            alt={''}
                        />
                        <div className={style.playBadge}>
                            {playerState === 'loading' ? (
                                <Loader className={style.playLoader} />
                            ) : (
                                <svg
                                    className={style.playArrow}
                                    focusable={'false'}
                                    aria-hidden={'true'}
                                    viewBox={'0 0 22 26'}
                                >
                                    <path fill={'#fff'} d={'M22 13 0 26V0Z'} />
                                </svg>
                            )}
                        </div>
                    </div>
                }
            >
                <Label as={'p'} className={style.text}>
                    {`${translations('playMovie')} ${title}`}
                </Label>
                {duration > 0 && (
                    <Detail
                        className={classNames(style.text, style.videoLength)}
                    >
                        {`${translations(
                            'duration'
                        )} ${durationAsString} ${translations('minutes')}`}
                    </Detail>
                )}
            </Button>
            {playerState === 'error' && (
                <AlertBox variant={'error'}>{translations('error')}</AlertBox>
            )}
            <div
                className={classNames(
                    style.macroVideo,
                    playerState !== 'ready' && style.hidden
                )}
                ref={videoRef}
                title={title}
            />
        </div>
    );
};
