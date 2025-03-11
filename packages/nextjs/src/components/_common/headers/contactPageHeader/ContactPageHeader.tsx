import { BodyShort, Heading } from '@navikt/ds-react';
import { Illustration } from 'components/_common/illustration/Illustration';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentProps } from 'types/content-props/_content-common';
import style from './ContactPageHeader.module.scss';

type Props = {
    contentProps: Pick<ContentProps, 'data'> & {
        data: Pick<ProductDataMixin, 'title' | 'illustration'>;
    };
    textAboveTitle?: string;
};

export const ContactPageHeader = ({ contentProps, textAboveTitle }: Props) => {
    const { data } = contentProps;
    const { title, illustration } = data;

    return (
        <div className={style.contactPageHeader}>
            <div>
                <Illustration illustration={illustration} />
            </div>
            <div>
                <BodyShort textColor="subtle" className={style.textAboveTitle}>
                    {textAboveTitle}
                </BodyShort>
                <Heading level="1" size="large" spacing className={style.header}>
                    {title}
                </Heading>
            </div>
        </div>
    );
};
