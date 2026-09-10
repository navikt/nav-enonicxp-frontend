import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import ArtikkelDato from 'components/parts/_legacy/artikkel/komponenter/ArtikkelDato';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { ArtikkelData } from 'types/content-props/artikkel-props';

import style from './PageHeading.module.scss';

export const PageHeadingLegacyPart = (props: ContentProps) => {
    const displayName = props.displayName;
    const data = props.data as ArtikkelData;
    const isNewsArticle = data.contentType === 'news' || data.contentType === 'pressRelease';
    const ingress = props.type !== ContentType.SectionPage && props.data?.ingress;

    return (
        <section className={style.pageHeading}>
            <Heading level="1" size="xlarge">
                {displayName || 'Tittel'}
            </Heading>
            <ArtikkelDato contentProps={props} type={isNewsArticle ? 'newsPress' : 'normal'} />

            {ingress && (
                <div className={style.ingress}>
                    <BodyLong size={'large'}>{ingress}</BodyLong>
                </div>
            )}
        </section>
    );
};
