import React from 'react';
import { LinkProps } from 'types/link-props';
import { CardSize, CardType } from 'types/card';
import { LenkeBase } from '../lenke/LenkeBase';
import { useCard } from './useCard';
import { classNames } from 'utils/classnames';
import { TargetPage } from 'types/component-props/parts/product-card';
import { getCardProps } from 'components/_common/card/card-utils';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { BodyShort } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';

import sharedStyle from './Card.module.scss';
import style from './MicroCard.module.scss';

const MicroCard = ({ link, type }: { link: LinkProps; type: CardType }) => {
    const { analyticsProps } = useCard({ type, size: CardSize.Micro, link });
    return (
        <LenkeBase
            href={link.url}
            {...analyticsProps}
            className={classNames(sharedStyle.card, sharedStyle.inline)}
        >
            <div className={classNames(sharedStyle.bed, style.micro, type)}>
                {link.text}
            </div>
        </LenkeBase>
    );
};

type Props = {
    header?: string;
    card_list: TargetPage[];
};

export const MicroCards = ({ header, card_list }: Props) => {
    const { language } = usePageConfig();

    const cardProps = card_list.reduce((acc, card) => {
        const props = getCardProps(card, language);
        return props ? [...acc, props] : acc;
    }, []);

    if (cardProps.length === 0) {
        return (
            <EditorHelp
                text={'Velg minst én lenke for å aktivere mikrokortene'}
            />
        );
    }

    return (
        <>
            {header && (
                <BodyShort size={'medium'} className={style.header}>
                    {header}
                </BodyShort>
            )}
            {cardProps.map((card, index) => (
                <MicroCard {...card} key={index} />
            ))}
        </>
    );
};
