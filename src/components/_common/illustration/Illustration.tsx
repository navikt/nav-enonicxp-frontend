import { PublicImage } from '../image/PublicImage';
import { BEM, classNames } from '../../../utils/classnames';

import './Illustration.less';
import { url } from 'node:inspector';

interface IllustrationProps {
    illustration: any;
    placement: string;
}

const bem = BEM('illustration');

export const Illustration = ({
    illustration,
    placement,
}: IllustrationProps) => {
    // Need baseClassName to scope this component
    // as it's being used throughout the page.

    if (!illustration) {
        return null;
    }

    const { icons } = illustration?.data;

    const [icon1, icon2, icon3] = icons;

    console.log(illustration);

    return (
        <div className={classNames(bem('image'), bem(placement))}>
            <div
                className={classNames(bem('icon'), bem('icon', 'icon2'))}
                style={{ backgroundImage: `url(${icon2.icon.mediaUrl})` }}
            />
            <div
                className={classNames(bem('icon'), bem('icon', 'icon1'))}
                style={{ backgroundImage: `url(${icon1.icon.mediaUrl})` }}
            />
            <div
                className={classNames(bem('icon'), bem('icon', 'icon3'))}
                style={{ backgroundImage: `url(${icon3.icon.mediaUrl})` }}
            />
        </div>
    );
};
