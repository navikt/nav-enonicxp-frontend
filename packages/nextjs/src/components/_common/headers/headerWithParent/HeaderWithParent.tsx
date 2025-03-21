import { BodyShort, Heading } from '@navikt/ds-react';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentProps } from 'types/content-props/_content-common';
import { classNames } from 'utils/classnames';
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
        <div className={classNames(style.headerContainer, className)}>
            <BodyShort textColor="subtle" className={style.textAboveTitle}>
                {textAboveTitle}
            </BodyShort>
            <Heading level="1" size="large" spacing className={style.header}>
                {data.title}
            </Heading>
            {formNumbers && (
                <ul className={style.skjemanummerListe}>
                    {formNumbers.map((nummer, index) => (
                        <li key={index} className={style.skjemanummer}>
                            {nummer}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
