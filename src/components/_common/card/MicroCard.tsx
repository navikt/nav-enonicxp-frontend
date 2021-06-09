import { LinkProps } from 'types/link-props';
import { classNames, BEM } from 'utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';

import { CardType } from 'types/card';
import './MicroCard.less';

export type MikroKortProps = {
    link: LinkProps;
    type: CardType;
};

const bem = BEM('card');

export const MicroCard = ({ link, type }: MikroKortProps) => {
    console.log(type);
    return (
        <LenkeBase
            href={link.url}
            className={classNames(bem(), bem('micro'), bem('micro', type))}
        >
            {link.text}
        </LenkeBase>
    );
};
