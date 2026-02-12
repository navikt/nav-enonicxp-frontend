import { BodyLong, Heading } from '@navikt/ds-react';
import { getContentTagline } from 'components/_common/headers/sharedHeaderUtils';
import { Illustration } from 'components/_common/illustration/Illustration';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentProps } from 'types/content-props/_content-common';
import { GeneralPageHeaderTagLine } from './GeneralPageHeaderTagLine';

import style from './GeneralPageHeader.module.scss';

type Props = {
    pageProps: Pick<ContentProps, 'type' | 'displayName' | 'language'> & {
        data: Pick<
            ProductDataMixin,
            | 'title'
            | 'illustration'
            | 'taxonomy'
            | 'audience'
            | 'customCategory'
            | 'ingress'
            | 'hideIngress'
        >;
    };
    hideIngressOverride?: boolean;
};

export const GeneralPageHeader = (props: Props) => {
    const { pageProps } = props;
    const { illustration, ingress, hideIngress } = pageProps.data;
    const title = pageProps.data.title || pageProps.displayName;

    const { tagline: tagLine } = getContentTagline(pageProps);

    return (
        <>
            <header className={style.generalPageHeader}>
                <Illustration illustration={illustration} className={style.illustration} />
                <GeneralPageHeaderTagLine tagLine={tagLine} />
                <Heading level="1" size="xlarge" className={style.header}>
                    {title}
                </Heading>
            </header>
            {ingress && !hideIngress && !props.hideIngressOverride && (
                <BodyLong className={style.ingress} size="medium">
                    {ingress}
                </BodyLong>
            )}
        </>
    );
};
