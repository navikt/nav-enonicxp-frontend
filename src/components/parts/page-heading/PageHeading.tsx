import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { BEM } from 'utils/bem';
import { GlobalPageProps } from 'types/content/_common';
import './PageHeading.less';

const bem = BEM('page-heading');

const PageHeading = (props: GlobalPageProps) => (
    <div className={bem('container')}>
        <Innholdstittel>{props.displayName || 'Tittel'}</Innholdstittel>
    </div>
);

export default PageHeading;
