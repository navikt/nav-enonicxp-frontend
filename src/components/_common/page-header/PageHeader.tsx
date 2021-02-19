import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './PageHeader.less';

type Props = {
    pageHeader: string;
};

export const PageHeader = ({ pageHeader }: Props) => {
    return pageHeader ? (
        <div className={'page-header'}>
            <Sidetittel>{pageHeader}</Sidetittel>
        </div>
    ) : null;
};
