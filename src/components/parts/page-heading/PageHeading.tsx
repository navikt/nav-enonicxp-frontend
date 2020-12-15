import React from 'react';
import { Ingress, Sidetittel } from 'nav-frontend-typografi';
import { BEM } from 'utils/bem';
import { ContentProps } from 'types/content-props/_content-common';
import './PageHeading.less';

const bem = BEM('page-heading');

const PageHeading = (props: ContentProps) => {
    const displayName = props.displayName;
    const ingress = props.data?.ingress;
    return (
        <div className={bem('container')}>
            <Sidetittel>{displayName || 'Tittel'}</Sidetittel>
            {ingress && (
                <div className={bem('ingress')}>
                    <Ingress>{ingress}</Ingress>
                </div>
            )}
        </div>
    );
};

export default PageHeading;
