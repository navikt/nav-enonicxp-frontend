import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { BEM } from 'utils/bem';
import { ContentProps } from 'types/content-props/_content-common';
import './PageHeading.less';

const bem = BEM('page-heading');

const PageHeading = (props: ContentProps) => {
    const displayName = props.displayName;
    return (
        <div className={bem('container')}>
            <Sidetittel>{displayName || 'Tittel'}</Sidetittel>
        </div>
    );
};

export default PageHeading;
