import React from 'react';
import { useAuthState } from 'store/hooks/useAuthState';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Omradekort } from 'components/_common/omradekort/Omradekort';
import { usePageContentProps } from 'store/pageContext';
import { PartConfigLoggedinCard } from 'components/parts/loggedin-card/LoggedinCardPart';

type Props = PartConfigLoggedinCard['card']['meldekort'];

export const LoggedinCardMeldekort = ({ link }: Props) => {
    const { meldekortStatus } = useAuthState();
    const { editorView } = usePageContentProps();

    if (!meldekortStatus?.isMeldekortBruker && !editorView) {
        return null;
    }

    const { text, url } = getSelectableLinkProps(link);

    return <Omradekort area={'employment-status-form'} path={url} title={text} />;
};
