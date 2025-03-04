import { Heading } from '@navikt/ds-react';
import { Illustration } from 'components/_common/illustration/Illustration';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentProps } from 'types/content-props/_content-common';

import style from './HeaderWithTextAboveTitle.module.scss';

type Props = {
    pageProps: Pick<ContentProps, 'type' | 'displayName' | 'language'> & {
        data: Pick<ProductDataMixin, 'title' | 'illustration'>;
    };
};

export const HeaderWithTextAboveTitle = (props: Props) => {
    const { pageProps } = props;
    const { illustration } = pageProps.data;
    const title = pageProps.data.title || pageProps.displayName;

    return (
        <div>
            <Illustration illustration={illustration} className={style.illustration} />
            {/* <BodyShort>{textAboveTitle}</BodyShort> */}
            <Heading level="1" size="xlarge" className={style.header}>
                {title}
            </Heading>
        </div>
    );
};
