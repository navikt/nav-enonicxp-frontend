import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { BEM } from 'utils/bem';
import { GlobalPageSchema } from 'types/content-types/_schema';
import './PageHeading.less';

const bem = BEM('page-heading');

const PageHeading = (props: GlobalPageSchema) => (
    <div className={bem('container')}>
        <Innholdstittel>{props.displayName || 'Tittel'}</Innholdstittel>
    </div>
);

export default PageHeading;
