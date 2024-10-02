import { BodyLong, Heading } from '@navikt/ds-react';
import { getContentTagline } from 'components/_common/headers/sharedHeaderUtils';
import { Illustration } from 'components/_common/illustration/Illustration';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { classNames } from 'utils/classnames';
import { GeneralPageHeaderTagLine } from './GeneralPageHeaderTagLine';

import style from './GeneralPageHeader.module.scss';

type PagePropsForPageHeader = Pick<ContentProps, 'type' | 'displayName' | 'language'> & {
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

type Props = {
    pageProps: PagePropsForPageHeader;
    hideIngressOverride?: boolean;
};

//type, displayName, language
//data.illustration, data.title, data.taxonomy, data.audience, data.customCategory, data.ingress, data.hideIngress

export const GeneralPageHeader = (props: Props) => {
    // const { pageProps } = props as { pageProps: PagePropsForPageHeader };
    const { pageProps } = props;
    const illustration = pageProps.data.illustration;
    const tagLine = getContentTagline(pageProps);
    const title = pageProps.data.title || pageProps.displayName;
    const { ingress, hideIngress } = pageProps.data;

    const isSituationPage = pageProps.type === ContentType.SituationPage;

    return (
        <div className={style.generalPageHeader}>
            <Illustration illustration={illustration} className={style.illustration} />
            {tagLine && <GeneralPageHeaderTagLine tagLine={tagLine} />}
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
