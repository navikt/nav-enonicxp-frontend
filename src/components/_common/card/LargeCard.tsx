import { LinkProps } from 'types/link-props';
import { classNames, BEM } from 'utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import { Innholdstittel, Element } from 'nav-frontend-typografi';
import { CardType } from 'types/card';
import { XpImageProps } from 'types/media';

import './Card.less';

export type StortKortProps = {
    link: LinkProps;
    icon: XpImageProps;
    description: string;
    category: string;
    type: CardType;
};

const bem = BEM('card');

export const LargeCard = (props: StortKortProps) => {
    const { link, description, type, category } = props;
    const { text, url } = link;

    return (
        <LenkeBase
            href={url}
            title={text}
            className={classNames(
                bem('large-card'),
                bem('large-card', type),
                bem('anchor')
            )}
        >
            <div className={classNames(bem('large-card'), bem('wrapper'))}>
                <Innholdstittel tag="h3" className={bem('title')}>
                    {text}
                </Innholdstittel>
                <Element className={bem('description')}>{description}</Element>
                <Element className={bem('category')}>{category}</Element>
            </div>
        </LenkeBase>
    );
};
