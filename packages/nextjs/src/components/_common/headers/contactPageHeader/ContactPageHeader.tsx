import { BodyShort, Heading } from '@navikt/ds-react';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentProps } from 'types/content-props/_content-common';
import { classNames } from 'utils/classnames';
import style from './ContactPageHeader.module.scss';

type Props = {
    contentProps: Pick<ContentProps, 'data'> & {
        data: Pick<ProductDataMixin, 'title' | 'illustration'>;
    };
    textAboveTitle?: string;
    className?: string;
};

export const ContactPageHeader = ({ contentProps, textAboveTitle, className }: Props) => {
    const { data } = contentProps;

    return (
        <div className={classNames(style.contactPageHeader, className)}>
            <BodyShort textColor="subtle" className={style.textAboveTitle}>
                {textAboveTitle}
            </BodyShort>
            <Heading level="1" size="large" spacing className={style.header}>
                {data.title}
            </Heading>
        </div>
    );
};
