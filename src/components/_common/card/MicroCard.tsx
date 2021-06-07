import { LinkProps } from 'types/link-props';
import { BEM } from 'utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';

import './Card.less';
import { CardType } from 'types/card';

export type MikroKortProps = {
    link: LinkProps;
    type: CardType;
};

const bem = BEM('kort');

export const MicroCard = (props: MikroKortProps) => {
    const { link } = props;
    const { text, url } = link;
    return (
        <LenkeBase href={url} title={text} className={bem('anchor')}>
            {text}
        </LenkeBase>
    );
};
