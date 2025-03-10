import { BodyShort, Heading } from '@navikt/ds-react';
import { Illustration } from 'components/_common/illustration/Illustration';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentProps } from 'types/content-props/_content-common';

// type Props = {
//     pageProps: Pick<ContentProps, 'type'> & {
//         data: Pick<ProductDataMixin, 'title' | 'illustration' | 'textAboveTitle'>;        // data: Pick<ProductDataMixin, 'title'>;
//     };
// };

type Props = {
        data: Pick<
            ProductDataMixin,
            'title' | 'illustration'
        >;
    textAboveTitle?: string;
};

export const ContactPageHeader = (props: Props) => {
    // const { textAboveTitle } = contentProps;
    const { title, illustration } = props.data;

    //const { pageProps } = props;
    //const { textAboveTitle, title, illustration } = pageProps.data;

    

    return (
        <div>
            <Illustration illustration={illustration} />
            <BodyShort textColor="subtle">{props.textAboveTitle}</BodyShort>
            <Heading level="1" size="large" spacing>
                {title}
            </Heading>
        </div>
    );
};
