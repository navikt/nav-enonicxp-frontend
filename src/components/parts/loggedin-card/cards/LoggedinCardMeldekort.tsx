import React from 'react';
import { LoggedInCardTypeProps } from '../../../../types/component-props/part-configs/loggedin-card';
import { useAuthState } from '../../../../store/hooks/useAuthState';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';
import { AreaCard } from '../../../_common/area-card/AreaCard';
import { usePageConfig } from '../../../../store/hooks/usePageConfig';

type Props = LoggedInCardTypeProps['meldekort'];

export const LoggedinCardMeldekort = ({ link }: Props) => {
    const { meldekortStatus } = useAuthState();
    const { pageConfig } = usePageConfig();

    if (!meldekortStatus?.isMeldekortBruker && !pageConfig.editorView) {
        return null;
    }

    const { text, url } = getSelectableLinkProps(link);

    return <AreaCard area={'employment-status-form'} path={url} title={text} />;
};
