import { LinkProps } from 'types/link-props';
import { classNames, BEM } from 'utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { CardType } from 'types/card';
import { XpImageProps } from 'types/media';

import './Card.less';

export type StortKortProps = {
    link: LinkProps;
    illustration?: XpImageProps;
    description: string;
    category: string;
    type: CardType;
};

const bem = BEM('card');

export const LargeCard = (props: StortKortProps) => {
    const { link, description, type, category, illustration } = props;
    const { text, url } = link;

    const hasIllustration =
        illustration &&
        (type === CardType.Product || type === CardType.Situation);

    return (
        <LenkeBase
            href={url}
            title={text}
            className={classNames(bem('large-card'), bem(type), bem('anchor'))}
        >
            <div className={classNames(bem('wrapper'), type)}>
                {hasIllustration && <div className={bem('illustration')} />}
                <Undertittel tag="h3" className={bem('title')}>
                    {text}
                </Undertittel>
                <Element className={bem('description')}>{description}</Element>
                <Element className={bem('category')}>{category}</Element>
            </div>
        </LenkeBase>
    );
};
