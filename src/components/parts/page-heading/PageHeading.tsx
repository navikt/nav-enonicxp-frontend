import React from 'react';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import { BEM } from 'utils/bem';
import { ContentProps } from 'types/content-props/_content-common';
import './PageHeading.less';

const bem = BEM('page-heading');

const PageHeading = (props: ContentProps) => (
    <div className={bem('container')}>
        <Innholdstittel>{props.displayName || 'Tittel'}</Innholdstittel>
        {props.data?.ingress && (
            <div className={bem('ingress')}>
                <Ingress>{props.data?.ingress || 'Ingress'}</Ingress>
            </div>
        )}
    </div>
);

export default PageHeading;
