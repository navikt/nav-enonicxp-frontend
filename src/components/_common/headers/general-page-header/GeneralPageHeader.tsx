import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import {
    PagePropsForPageHeader,
    getContentTagline,
} from 'components/_common/headers/sharedHeaderUtils';
import { Illustration } from 'components/_common/illustration/Illustration';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { classNames } from 'utils/classnames';

import style from './GeneralPageHeader.module.scss';

type Props = {
    pageProps: ContentProps;
    hideIngressOverride?: boolean;
};

export const GeneralPageHeader = (props: Props) => {
    const { pageProps } = props as { pageProps: PagePropsForPageHeader };
    const illustration = pageProps.data.illustration;
    const tagLine = getContentTagline(pageProps);
    const title = pageProps.data.title || pageProps.displayName;
    const { ingress, hideIngress } = pageProps.data;

    const isSituationPage = pageProps.type === ContentType.SituationPage;

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
            <Heading
                level="1"
                size="xlarge"
                className={classNames(style.header, isSituationPage && style.reduceMarginBottom)}
            >
                {title}
            </Heading>
            {ingress && !hideIngress && !props.hideIngressOverride && (
                <BodyLong className={style.ingress} size="large">
                    {ingress}
                </BodyLong>
            )}
        </div>
    );
};
