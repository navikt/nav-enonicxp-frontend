import { LinkProps } from 'types/link-props';
import { BodyLong, BodyShort, Detail } from '@navikt/ds-react';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';

import { classNames } from 'utils/classnames';

import style from './NewsCard.module.scss';

export type NewsCardProps = {
    link: LinkProps;
    className?: string;
    dateTag: string;
};

export const NewsCard = (props: NewsCardProps) => {
    const { link, className, dateTag } = props;
    const { text } = link;

    return (
        <Card
            link={link}
            type={CardType.NewsCard}
            size={CardSize.Mini}
            className={classNames(style.newsCard, className)}
        >
            <>
                <BodyLong className={style.title}>{text}</BodyLong>
                <Detail className={style.dateTag} size="small">
                    {dateTag}
                </Detail>
            </>
        </Card>
    );
};
