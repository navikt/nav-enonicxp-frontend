import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { logger } from 'srcCommon/logger';
import { usePageContentProps } from 'store/pageContext';
import { fetchJson } from 'srcCommon/fetch-utils';
import { editorFetchAdminUserId } from 'components/_editor-only/editor-hacks/editor-hacks-utils';

import { SurpriseFrida } from './SurpriseFrida';

const fetchSurpriseState = () =>
    editorFetchAdminUserId().then((userId) =>
        fetchJson(`${process.env.APP_ORIGIN}/api/surprise?uid=${userId}`, 10000, {
            credentials: 'include',
        })
    );

export const Surprise = () => {
    const { editorView } = usePageContentProps();

    const [showSurprise, setShowSurprise] = useState(false);
    const [animateSurprise, setAnimateSurprise] = useState(false);

    useEffect(() => {
        if (editorView) {
            fetchSurpriseState();
            return;
        }

        const isSurprised = Cookie.get('surprise') === 'true';
        logger.info(`Should get a surprise? ${isSurprised}`);

        if (!isSurprised) {
            return;
        }

        setShowSurprise(true);
        setTimeout(() => setAnimateSurprise(true), 100);
    }, [editorView]);

    if (!showSurprise) {
        return null;
    }

    return <SurpriseFrida animate={animateSurprise} />;
};
