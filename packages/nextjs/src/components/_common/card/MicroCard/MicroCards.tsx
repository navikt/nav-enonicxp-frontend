import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { CardProps, CardTargetProps, getCardProps } from 'components/_common/card/card-utils';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { usePageContentProps } from 'store/pageContext';

import { MicroCard } from './MicroCard';
import style from './MicroCards.module.scss';

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
                {cardProps.map((card) => (
                    <MicroCard {...card} key={card.link.url} />
                ))}
            </div>
        </>
    );
};
