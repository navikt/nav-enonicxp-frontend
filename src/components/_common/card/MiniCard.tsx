import { LinkProps } from 'types/link-props';
import { BEM } from 'utils/classnames';
import { Normaltekst } from 'nav-frontend-typografi';
import { CardSize, CardType } from 'types/card';

import './MiniCard.less';
import { Card } from './Card';

export type MiniKortProps = {
    link: LinkProps;
    illustration?: any;
    type: CardType;
};

const bem = BEM('card');

export const MiniCard = (props: MiniKortProps) => {
    const { link, illustration, type } = props;
    const { text } = link;

    return (
        <Card link={link} type={type} size={CardSize.Mini}>
            <>
                <Normaltekst className={bem('title')}>{text}</Normaltekst>
            </>
        </Card>
    );
};
