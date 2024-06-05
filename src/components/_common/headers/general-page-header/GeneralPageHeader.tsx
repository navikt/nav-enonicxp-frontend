import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import {
    PagePropsForPageHeader,
    getHeaderTagline,
} from 'components/_common/headers/sharedHeaderUtils';
import { Illustration } from 'components/_common/illustration/Illustration';
import { ContentProps } from 'types/content-props/_content-common';

import style from './GeneralPageHeader.module.scss';

type Props = {
    pageProps: ContentProps;
};

export const GeneralPageHeader = (props: Props) => {
    const { pageProps } = props as { pageProps: PagePropsForPageHeader };
    const illustration = pageProps.data.illustration;
    const tagLine = getHeaderTagline(pageProps);
    const title = pageProps.data.title || pageProps.displayName;
    const { ingress, hideIngress } = pageProps.data;

    return (
        <div className={style.generalPageHeader}>
            <Illustration
                illustration={illustration}
                preferStaticIllustration={true}
                className={style.illustration}
            />
            {tagLine && (
                <BodyShort className={style.tagline} size="small">
                    {tagLine}
                </BodyShort>
            )}
            <Heading level="1" size="xlarge" className={style.header}>
                {title}
            </Heading>
            {ingress && !hideIngress && (
                <BodyLong size="large" className={style.ingress}>
                    {ingress}
                </BodyLong>
            )}
        </div>
    );
};
