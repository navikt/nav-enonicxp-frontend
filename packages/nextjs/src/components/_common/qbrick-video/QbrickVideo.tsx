import React, { useEffect, useId } from 'react';
import { Button, Detail, Label, Loader } from '@navikt/ds-react';
import Script from 'next/script';
import { logger } from '@/shared/logger';
import { translator } from 'translations';
import { getMediaUrl } from 'utils/urls';
import { classNames } from 'utils/classnames';
import { AlertBox } from 'components/_common/alertBox/AlertBox';
import { NextImage } from 'components/_common/image/NextImage';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { QbrickVideoProps } from './utils/videoProps';
import { getTimestampFromDuration } from './utils/videoHelpers';
import { useQbrickPlayerState } from './useQbrickPlayerState';

import style from './QbrickVideo.module.scss';

export const QbrickVideo = (props: QbrickVideoProps) => {
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const { language: contentLanguage, editorView } = contentProps;
    const { title, duration, poster } = props;
    const videoContainerId = useId();
    const { createAndStartPlayer, resetPlayer, playerState, setPlayerState } = useQbrickPlayerState(
        {
            videoProps: props,
            videoContainerId,
            context,
            innholdstype: innholdsTypeMap[contentProps.type],
        }
    );

    useEffect(() => {
        return resetPlayer;
    }, [resetPlayer]);

    const translations = translator('macroVideo', contentLanguage);
    const durationAsString = getTimestampFromDuration(duration);
    const imageUrl = poster?.startsWith('http')
        ? poster
        : getMediaUrl(poster, !!editorView, contentLanguage);

    return (
        <div className={style.wrapper}>
            <Script
                src={'https://play2.qbrick.com/qbrick-player/framework/GoBrain.min.js'}
                async={true}
                onError={(error) => {
                    logger.error(`Failed to load QBrick player script - ${error}`);
                    setPlayerState('error');
                }}
            />
            <Button
                className={classNames(style.button, playerState === 'ready' && style.hidden)}
                variant={'tertiary'}
                onClick={() => {
                    if (editorView !== 'edit') {
                        createAndStartPlayer();
                    }
                }}
                icon={
                    <div className={style.posterWrapper}>
                        {imageUrl && (
                            <NextImage className={style.previewImage} src={imageUrl} alt="" />
                        )}
                        <div className={style.playBadge}>
                            {playerState === 'loading' ? (
                                <Loader className={style.playLoader} />
                            ) : (
                                <svg
                                    className={style.playArrow}
                                    focusable="false"
                                    aria-hidden="true"
                                    role="img"
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
                    <Detail className={classNames(style.text, style.videoLength)}>
                        {`${translations('duration')} ${durationAsString} ${translations(
                            'minutes'
                        )}`}
                    </Detail>
                )}
            </Button>
            {playerState === 'error' && (
                <AlertBox variant={'error'}>{translations('error')}</AlertBox>
            )}
            <div
                className={classNames(style.macroVideo, playerState !== 'ready' && style.hidden)}
                id={videoContainerId}
                title={title}
                data-qplayer-analytics="off"
            />
        </div>
    );
};
