import { BodyShort, Heading } from '@navikt/ds-react';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentProps } from 'types/content-props/_content-common';
import { classNames } from 'utils/classnames';
import { FormNumberTag } from 'components/_common/formNumberTag/FormNumberTag';
import style from './HeaderWithParent.module.scss';

type Props = {
    contentProps: Pick<ContentProps, 'data'> & {
        data: Pick<ProductDataMixin, 'title'>;
    };
    textAboveTitle?: string;
    className?: string;
    formNumbers?: string[];
};

export const HeaderWithParent = ({
    contentProps,
    textAboveTitle,
    className,
    formNumbers,
}: Props) => {
    const { data } = contentProps;
    return (
        <header className={classNames(style.headerContainer, className)}>
            <BodyShort textColor="subtle" className={style.textAboveTitle}>
                {textAboveTitle}
            </BodyShort>
            <Heading level="1" size="xlarge" spacing>
                {data.title}
            </Heading>
            {formNumbers && (
                <ul className={style.formNumberListe}>
                    {formNumbers.map((nummer, index) => (
                        <FormNumberTag key={index} formNumber={nummer} />
                    ))}
                </ul>
            )}
        </header>
    );
};
