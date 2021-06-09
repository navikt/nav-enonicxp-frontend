import { LinkProps } from 'types/link-props';
import { BEM } from 'utils/classnames';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';
import './LargeCard.less';
import { Illustration } from '../illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';

export type StortKortProps = {
    link: LinkProps;
    illustration?: any;
    description: string;
    category: string;
    type: CardType;
};

const bem = BEM('card');

export const LargeCard = (props: StortKortProps) => {
    const { link, description, type, category, illustration } = props;
    const { text } = link;

    const hasIllustration =
        illustration &&
        (type === CardType.Product || type === CardType.Situation);

    return (
        <Card link={link} type={type} size={CardSize.Large}>
            <>
                {hasIllustration && (
                    <Illustration
                        illustration={illustration}
                        placement={IllustrationPlacements.LARGE_CARD}
                        className={bem('illustration')}
                    />
                )}
                <Undertittel tag="h3" className={bem('title')}>
                    {text}
                </Undertittel>
                <Element className={bem('description')}>{description}</Element>
                <Element className={bem('category')}>{category}</Element>
            </>
        </Card>
    );
};
