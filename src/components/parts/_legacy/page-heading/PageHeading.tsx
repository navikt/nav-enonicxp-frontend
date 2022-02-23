import React from 'react';
import { Heading, Ingress } from '@navikt/ds-react';
import { BEM } from 'utils/classnames';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

const bem = BEM('page-heading');

const PageHeading = (props: ContentProps) => {
    const displayName = props.displayName;
    const ingress =
        props.__typename !== ContentType.SectionPage && props.data?.ingress;

    return (
        <header className={bem('container')}>
            <Heading level="1" size="xlarge">
                {displayName || 'Tittel'}
            </Heading>
            {ingress && (
                <div className={bem('ingress')}>
                    <Ingress>{ingress}</Ingress>
                </div>
            )}
        </header>
    );
};

export default PageHeading;
