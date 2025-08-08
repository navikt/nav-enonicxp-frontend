import React from 'react';
import { useAuthState } from 'store/hooks/useAuthState';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Omradekort } from 'components/_common/omradekort/Omradekort';
import { usePageContentProps } from 'store/pageContext';
import { PartConfigKortForInnloggetBruker } from 'components/parts/kort-for-innlogget-bruker/KortForInnloggetBrukerPart';

type Props = PartConfigKortForInnloggetBruker['card']['meldekort'];

export const KortForInnloggetBruker_Meldekort = ({ link }: Props) => {
    const { meldekortStatus } = useAuthState();
    const { editorView } = usePageContentProps();

    if (!meldekortStatus?.isMeldekortBruker && !editorView) {
        return null;
    }

    const { text, url } = getSelectableLinkProps(link);

    return <Omradekort area={'employment-status-form'} path={url} title={text} />;
};
