import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { LinkProps } from 'types/link-props';
import { CardSize, CardType } from 'types/card';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { classNames } from 'utils/classnames';
import { CardProps, CardTargetProps, getCardProps } from 'components/_common/card/card-utils';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { usePageContentProps } from 'store/pageContext';
import { useCard } from './useCard';

import sharedStyle from './Card.module.scss';
import style from './MicroCard.module.scss';

export const MicroCard = ({ link, type }: { link: LinkProps; type: CardType }) => {
    const { analyticsProps } = useCard({ type, size: CardSize.Micro, link });
    return (
        <LenkeBase
            href={link.url}
            {...analyticsProps}
            className={classNames(sharedStyle.card, sharedStyle.inline, style.container)}
        >
            <div className={classNames(sharedStyle.bed, style.micro, type)}>{link.text}</div>
        </LenkeBase>
    );
};

type Props = {
    header?: string;
    card_list: CardTargetProps[];
};

export const MicroCards = ({ header, card_list }: Props) => {
    const content = usePageContentProps();

    const cardProps = card_list.reduce<CardProps[]>((acc, card) => {
        const props = getCardProps(card, content);
        if (props) {
            acc.push(props);
        }

        return acc;
    }, []);

    if (cardProps.length === 0) {
        return <EditorHelp text={'Velg minst én lenke for å aktivere mikrokortene'} />;
    }

    return (
        <>
            {header && (
                <BodyShort size={'medium'} className={style.header}>
                    {header}
                </BodyShort>
            )}
            <div className={style.wrapper}>
                {cardProps.map((card, index) => (
                    <MicroCard {...card} key={index} />
                ))}
            </div>
        </>
    );
};
