import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import {
    PagePropsForPageHeader,
    getHeaderTagline,
} from 'components/_common/headers/sharedHeaderUtils';
import { ContentProps } from 'types/content-props/_content-common';

import style from './GeneralPageHeader.module.scss';

type Props = {
    pageProps: ContentProps;
};

export const GeneralPageHeader = (props: Props) => {
    const { pageProps } = props as { pageProps: PagePropsForPageHeader };
    const tagLine = getHeaderTagline(pageProps);
    const title = pageProps.data.title || pageProps.displayName;
    const ingress = pageProps.data.ingress;

    return (
        <div className={style.generalPageHeader}>
            {tagLine && (
                <BodyShort className={style.tagline} size="small">
                    {tagLine}
                </BodyShort>
            )}
            <Heading level="1" size="xlarge" className={style.header}>
                {title}
            </Heading>
            {ingress && <BodyLong size="large">{ingress}</BodyLong>}
        </div>
    );
};
