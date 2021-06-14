import { LinkProps } from 'types/link-props';
import { BEM } from 'utils/classnames';

import { CardSize, CardType } from 'types/card';
import './MicroCard.less';
import { Card } from './Card';
import { Normaltekst } from 'nav-frontend-typografi';

export type MikroKortProps = {
    link: LinkProps;
    type: CardType;
};

const bem = BEM('card');

export const MicroCard = ({ link, type }: MikroKortProps) => {
    return (
        <Card link={link} type={type} size={CardSize.Micro}>
            <Normaltekst className={bem('title')}>{link.text}</Normaltekst>
        </Card>
    );
};
