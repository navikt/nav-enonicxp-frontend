import { LinkProps } from 'types/link-props';
import { BodyLong, BodyShort, Detail } from '@navikt/ds-react';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';

import { classNames } from 'utils/classnames';

import style from './ShortcutCard.module.scss';

export type ShortcutCardProps = {
    link: LinkProps;
    className?: string;
};

export const ShortcutCard = (props: ShortcutCardProps) => {
    const { link, className } = props;
    const { text } = link;

    return (
        <Card
            link={link}
            type={CardType.ShortcutCard}
            size={CardSize.Mini}
            className={classNames(style.shortcutCard, className)}
        >
            <>
                <BodyLong className={style.title}>{text}</BodyLong>
            </>
        </Card>
    );
};
