import { useCallback, useId, useState } from 'react';
import { QbrickVideoProps } from './utils/types';
import { logger } from 'srcCommon/logger';
import { AnalyticsEvents, logAmplitudeEvent } from '../../../utils/amplitude';

type PlayerState = 'loading' | 'ready' | 'error' | 'stopped';

const PLAYER_TIMEOUT_MS = 5000;
const PLAYER_POLLING_RATE_MS = 50;

type Props = {
    videoProps: QbrickVideoProps;
    videoContainer: HTMLElement | null;
};

export const useQbrickPlayerState = ({ videoProps, videoContainer }: Props) => {
    const [playerState, setPlayerState] = useState<PlayerState>('stopped');
    const widgetId = useId();

    const createAndStartPlayer = useCallback(() => {
        if (!videoContainer || playerState === 'loading') {
            return;
        }

        createAndStart(videoProps, videoContainer, widgetId, setPlayerState);
    }, [videoProps, videoContainer, widgetId, setPlayerState]);

    const resetPlayer = useCallback(() => {
        setPlayerState('stopped');

        if (window.GoBrain) {
            window.GoBrain.destroy(widgetId, true);
        }
    }, [widgetId]);

    return {
        playerState,
        setPlayerState,
        createAndStartPlayer,
        resetPlayer,
    };
};

const createAndStart = (
    { accountId, mediaId, language, title, duration }: QbrickVideoProps,
    videoContainer: HTMLElement,
    widgetId: string,
    setPlayerState: (state: PlayerState) => void
) => {
    const createPlayer = (timeLeft: number = PLAYER_TIMEOUT_MS) => {
        if (timeLeft <= 0) {
            logger.error('Failed to load QBrick player - Timed out');
            setPlayerState('error');
            return;
        }

        // Should be defined when the GoBrain init script has finished executing
        // There doesn't seem to be an elegant way to consistently determine when
        // this has happened, so we do some polling...
        if (!window.GoBrain) {
            setTimeout(
                () => createPlayer(timeLeft - PLAYER_POLLING_RATE_MS),
                PLAYER_POLLING_RATE_MS
            );
            return;
        }

        const widgetExists = !!window.GoBrain.widgets(widgetId);
        if (widgetExists) {
            return 'ready';
        }

        window.GoBrain.create(videoContainer, {
            config: `//video.qbrick.com/play2/api/v1/accounts/${accountId}/configurations/qbrick-player`,
            data: `//video.qbrick.com/api/v1/public/accounts/${accountId}/medias/${mediaId}`,
            language,
            autoplay: true,
            widgetId,
        }).on('ready', () => {
            setPlayerState('ready');
            logAmplitudeEvent(AnalyticsEvents.VIDEO_START, {
                tittel: title,
                varighet: duration,
                språk: language,
            });
        });
    };

    createPlayer();
};
