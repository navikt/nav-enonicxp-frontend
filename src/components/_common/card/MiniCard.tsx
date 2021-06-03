import { LinkProps } from 'types/link-props';
import { classNames, BEM } from 'utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import { Innholdstittel } from 'nav-frontend-typografi';
import { CardType } from 'types/card';
import { XpImageProps } from 'types/media';

import './Card.less';

export type MiniKortProps = {
    link: LinkProps;
    illustration?: XpImageProps;
    type: CardType;
};

const bem = BEM('kort');

export const MiniCard = (props: MiniKortProps) => {
    const { link } = props;
    const { text, url } = link;
    return (
        <LenkeBase href={url} title={text} className={bem('anchor')}>
            <div className={classNames(bem('wrapper'))}>
                <Innholdstittel tag="h3" className={bem('tittel')}>
                    {text}
                </Innholdstittel>
            </div>
        </LenkeBase>
    );
};
