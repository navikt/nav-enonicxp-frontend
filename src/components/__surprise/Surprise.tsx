import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import dynamic from 'next/dynamic';
import { logger } from 'srcCommon/logger';
import { usePageContentProps } from 'store/pageContext';
import { fetchJson } from 'srcCommon/fetch-utils';
import { editorFetchAdminUserId } from 'components/_editor-only/editor-hacks/editor-hacks-utils';

const SurpriseFrida = dynamic(() => import('./SurpriseFrida').then((mod) => mod.SurpriseFrida));
const SurpriseConfetti = dynamic(() =>
    import('./SurpriseConfetti').then((mod) => mod.SurpriseConfetti)
);

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
    const [startConfetti, setStartConfetti] = useState(false);

    useEffect(() => {
        if (editorView) {
            fetchSurpriseState();
            return;
        }

        const isSurprised =
            Cookie.get('surprise') === 'true' && Cookie.get('nosurprise') !== 'true';
        logger.info(`Should get a surprise? ${isSurprised}`);

        if (!isSurprised) {
            return;
        }

        setShowSurprise(true);
        setTimeout(() => setAnimateSurprise(true), 2000);
        setTimeout(() => setStartConfetti(true), 3000);
    }, [editorView]);

    if (!showSurprise) {
        return null;
    }

    return (
        <>
            <SurpriseFrida animate={animateSurprise} stop={() => setShowSurprise(false)} />
            <SurpriseConfetti start={startConfetti} />
        </>
    );
};
