import React from 'react';
import { LinkProps } from 'types/link-props';
import { CardSize, CardType } from 'types/card';
import { LenkeBase } from '../lenke/LenkeBase';
import { useCard } from './useCard';
import { classNames } from 'utils/classnames';
import { TargetPage } from 'types/component-props/parts/product-card';
import { getCardProps } from 'components/_common/card/card-utils';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { Label } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './Card.module.scss';

const MicroCard = ({ link, type }: { link: LinkProps; type: CardType }) => {
    const { analyticsProps } = useCard({ type, size: CardSize.Micro, link });
    return (
        <LenkeBase
            href={link.url}
            {...analyticsProps}
            className={classNames(style.card, style.inline)}
        >
            <div className={classNames(style.bed, type, CardSize.Micro)}>
                {link.text}
            </div>
        </LenkeBase>
    );
};

export const MicroCards = ({
    header,
    card_list,
}: {
    header?: string;
    card_list: TargetPage[];
}) => {
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
            {header && <Label size="medium">{header}</Label>}
            {cardProps.map((card, index) => (
                <MicroCard {...card} key={index} />
            ))}
        </>
    );
};
