import React from 'react';
import { Heading, Ingress } from '@navikt/ds-react';
import {
    CustomContentProps,
    ContentType,
} from 'types/content-props/_content-common';

import style from './PageHeading.module.scss';

const PageHeading = (props: CustomContentProps) => {
    const displayName = props.displayName;
    const ingress =
        props.__typename !== ContentType.SectionPage && props.data?.ingress;

    return (
        <header className={style.pageHeading}>
            <Heading level="1" size="xlarge">
                {displayName || 'Tittel'}
            </Heading>
            {ingress && (
                <div className={style.ingress}>
                    <Ingress>{ingress}</Ingress>
                </div>
            )}
        </header>
    );
};

export default PageHeading;
