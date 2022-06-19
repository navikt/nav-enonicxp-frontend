import React, { useEffect } from 'react';
import { LoggedInCardTypeProps } from '../../../../types/component-props/parts/loggedin-card';
import LenkepanelNavNo from '../../../_common/lenkepanel/LenkepanelNavNo';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';
import { useAuthState } from '../../../../store/hooks/useAuthState';

type Props = LoggedInCardTypeProps['meldekort'];

export const LoggedinCardMeldekort = ({ link }: Props) => {
    const { authState } = useAuthState();

    useEffect(() => {}, [authState]);

    const { text, url } = getSelectableLinkProps(link);

    // Placeholder. This should use the "Areacard" visual component
    return <LenkepanelNavNo href={url} tittel={text} />;
};
