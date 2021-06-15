import { LinkProps } from 'types/link-props';
import { BEM } from 'utils/classnames';
import { Normaltekst } from 'nav-frontend-typografi';
import { CardSize, CardType } from 'types/card';

import './MiniCard.less';
import { Card } from './Card';
import { Illustration } from '../illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import { AnimatedIconsProps } from '../../../types/content-props/animated-icons';

export type MiniKortProps = {
    link: LinkProps;
    illustration?: AnimatedIconsProps;
    type: CardType;
};

const bem = BEM('card');

export const MiniCard = (props: MiniKortProps) => {
    const { link, illustration, type } = props;
    const { text } = link;

    return (
        <Card link={link} type={type} size={CardSize.Mini}>
            <>
                <Illustration
                    illustration={illustration}
                    placement={IllustrationPlacements.SMALL_CARD}
                    className="card__illustration"
                />
                <Normaltekst className={bem('title')}>{text}</Normaltekst>
            </>
        </Card>
    );
};
