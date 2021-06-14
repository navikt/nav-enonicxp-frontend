import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { BEM, classNames } from '../../../utils/classnames';

import './Illustration.less';
interface IllustrationProps {
    illustration: AnimatedIconsProps;
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

    const [icon1, icon2] = icons;

    return (
        <div
            className={classNames(bem('image'), className)}
            role="img"
            aria-label={illustration.displayName}
        >
            <div
                className={classNames(bem('icon'), bem('icon', 'icon1'))}
                style={{
                    backgroundImage: `url(${icon1.icon?.mediaUrl})`,
                    transform: buildTransformStyling(icon1, 'none'),
                }}
            />
            <div
                className={classNames(bem('icon'), bem('icon', 'icon2'))}
                style={{
                    backgroundImage: `url(${icon2.icon?.mediaUrl})`,
                    transform: buildTransformStyling(icon2, 'none'),
                }}
            />
        </div>
    );
};
