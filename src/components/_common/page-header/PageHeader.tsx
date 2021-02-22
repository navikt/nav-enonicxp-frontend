import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { BEM } from '../../../utils/classnames';
import './PageHeader.less';

const bem = BEM('page-header');

type Props = {
    pageHeader: string;
};

export const PageHeader = ({ pageHeader }: Props) => {
    return pageHeader ? (
        <div className={bem()}>
            <Sidetittel className={bem('title')}>{pageHeader}</Sidetittel>
        </div>
    ) : null;
};
