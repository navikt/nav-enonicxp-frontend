import { useCallback, useId, useState } from 'react';
import { logger } from 'srcCommon/logger';
import { AnalyticsEvents, logAmplitudeEvent } from '../../../utils/amplitude';
import { QbrickVideoProps } from './utils/videoProps';

type PlayerState = 'loading' | 'ready' | 'error' | 'stopped';

const PLAYER_TIMEOUT_MS = 5000;
const PLAYER_POLLING_RATE_MS = 50;

type Props = {
    videoProps: QbrickVideoProps;
    videoContainerId: string;
};

export const useQbrickPlayerState = ({
    videoProps,
    videoContainerId,
}: Props) => {
    const [playerState, setPlayerState] = useState<PlayerState>('stopped');
    const widgetId = useId();

    const createAndStartPlayer = useCallback(() => {
        if (playerState === 'loading') {
            return;
        }

        const videoContainer = document.getElementById(videoContainerId);
        if (!videoContainer) {
            return;
        }

        createAndStart(videoProps, videoContainer, widgetId, setPlayerState);
    }, [videoProps, videoContainerId, widgetId, playerState, setPlayerState]);

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
            return;
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
