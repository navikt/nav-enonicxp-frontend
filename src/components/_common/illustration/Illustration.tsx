import { BEM, classNames } from '../../../utils/classnames';

import './Illustration.less';
interface IllustrationProps {
    illustration: any;
    placement: string;
    className: string;
}

const bem = BEM('illustration');

export const Illustration = ({
    illustration,
    placement,
    className,
}: IllustrationProps) => {
    // Need baseClassName to scope this component
    // as it's being used throughout the page.

    if (!illustration) {
        return null;
    }

    const buildTransformStyling = (icon, defaultStyling) => {
        if (!icon) {
            return '';
        }
        return icon.transformStart || defaultStyling;
    };

    const { icons } = illustration?.data;

    const [icon1, icon2, icon3] = icons;

    console.log(icon1);

    return (
        <div className={classNames(bem('image'), className)}>
            <div
                className={classNames(bem('icon'), bem('icon', 'icon2'))}
                style={{ backgroundImage: `url(${icon2.icon.mediaUrl})` }}
            />
            <div
                className={classNames(bem('icon'), bem('icon', 'icon1'))}
                style={{
                    backgroundImage: `url(${icon1.icon.mediaUrl})`,
                    transform: buildTransformStyling(
                        icon1,
                        'translateX(-40%) translateY(40%)'
                    ),
                }}
            />
            <div
                className={classNames(bem('icon'), bem('icon', 'icon3'))}
                style={{
                    backgroundImage: `url(${icon3.icon.mediaUrl})`,
                    transform: buildTransformStyling(
                        icon3,
                        'translateX(40%) translateY(-40%)'
                    ),
                }}
            />
        </div>
    );
};
