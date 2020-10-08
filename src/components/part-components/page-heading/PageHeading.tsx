import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { SectionPageProps } from 'types/content-types/section-page-props';
import { BEM } from 'utils/bem';
import './PageHeading.less';

const bem = BEM('page-heading');

const PageHeading = (props: SectionPageProps) => (
    <div className={bem('container')}>
        <Innholdstittel>{props.displayName || 'Tittel'}</Innholdstittel>
    </div>
);

export default PageHeading;
