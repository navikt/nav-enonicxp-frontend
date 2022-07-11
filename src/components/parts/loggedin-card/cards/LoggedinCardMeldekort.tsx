import React from 'react';
import { LoggedInCardTypeProps } from '../../../../types/component-props/parts/loggedin-card';
import { useAuthState } from '../../../../store/hooks/useAuthState';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';
import { AreaCard } from '../../../_common/area-card/AreaCard';

type Props = LoggedInCardTypeProps['meldekort'];

export const LoggedinCardMeldekort = ({ link }: Props) => {
    const { meldekortStatus } = useAuthState();

    if (!meldekortStatus) {
        return <div>{'Har ikke hentet meldekort info'}</div>;
    }

    if (!meldekortStatus.meldekort) {
        return <div>{'Er ikke meldekortbruker'}</div>;
    }

    const { text, url } = getSelectableLinkProps(link);

    return <AreaCard area={'employment-status-form'} path={url} title={text} />;
};
