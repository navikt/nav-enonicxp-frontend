import React from 'react';
import { Heading, Ingress } from '@navikt/ds-react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

import style from './PageHeading.module.scss';

export const PageHeadingLegacyPart = (props: ContentProps) => {
    const displayName = props.displayName;
    const ingress = props.type !== ContentType.SectionPage && props.data?.ingress;

    return (
        <section className={style.pageHeading}>
            <Heading level="1" size="xlarge">
                {displayName || 'Tittel'}
            </Heading>
            {ingress && (
                <div className={style.ingress}>
                    <Ingress>{ingress}</Ingress>
                </div>
            )}
        </section>
    );
};
