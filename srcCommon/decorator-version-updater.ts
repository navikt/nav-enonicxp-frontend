import { setInterval } from 'next/dist/compiled/@edge-runtime/primitives';
import { fetchJson } from 'srcCommon/fetch-utils';
import { logger } from 'srcCommon/logger';

type DecoratorVersionApiResponse = {
    versionId: string;
    started: number;
};

type DecoratorUpdateListener = (versionId: string) => unknown;

const DECORATOR_VERSION_API_URL = `${process.env.DECORATOR_URL}/api/version`;

const UPDATE_RATE_MS = 5000;

const listeners: Set<DecoratorUpdateListener> = new Set();

const currentVersion = {
    versionId: '',
    started: 0,
};

export const fetchDecoratorVersion = () =>
    fetchJson<DecoratorVersionApiResponse>(DECORATOR_VERSION_API_URL);

const fetchAndUpdateVersion = () =>
    fetchDecoratorVersion().then((response) => {
        if (!response) {
            logger.error('Failed to fetch decorator version!');
            return;
        }

        const { versionId, started } = response;

        if (versionId !== currentVersion.versionId && started > currentVersion.started) {
            logger.info(`New decorator version: ${versionId} [${started}]`);
            currentVersion.versionId = versionId;
            currentVersion.started = started;
            listeners.forEach((listener) => listener(versionId));
        }
    });

export const addDecoratorUpdateListener = (listener: DecoratorUpdateListener) => {
    listeners.add(listener);
};

export const removeDecoratorUpdateListener = (listener: DecoratorUpdateListener) => {
    listeners.delete(listener);
};

let intervalId: number | null = null;

export const initDecoratorVersionUpdater = () => {
    if (intervalId !== null) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(fetchAndUpdateVersion, UPDATE_RATE_MS);
};
