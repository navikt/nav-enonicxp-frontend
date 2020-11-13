import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { BEM } from 'utils/bem';
import { GlobalPageSchema } from 'types/content-types/_schema';
import './PageHeading.less';

const bem = BEM('page-heading');

const PageHeading = (props: GlobalPageSchema) => (
    <div className={bem('container')}>
        <Sidetittel>{props.displayName || 'Tittel'}</Sidetittel>
    </div>
);

export default PageHeading;
