import React from 'react';
import { Title, Ingress } from '@navikt/ds-react';
import { BEM } from 'utils/classnames';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import './PageHeading.less';

const bem = BEM('page-heading');

const PageHeading = (props: ContentProps) => {
    const displayName = props.displayName;
    const ingress =
        props.__typename !== ContentType.SectionPage && props.data?.ingress;
    return (
        <header className={bem('container')}>
            <Title level={1} size="2xl">
                {displayName || 'Tittel'}
            </Title>
            {ingress && (
                <div className={bem('ingress')}>
                    <Ingress>{ingress}</Ingress>
                </div>
            )}
        </header>
    );
};

export default PageHeading;
