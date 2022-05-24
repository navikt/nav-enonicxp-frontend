import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { getInternalAbsoluteUrl } from 'utils/urls';
import { BEM, classNames } from '../../../utils/classnames';

interface IllustrationStaticProps {
    illustration: AnimatedIconsProps;
    className?: string;
}

const bem = BEM('illustration');

export const IllustrationStatic = ({
    illustration,
    className,
}: IllustrationStaticProps) => {
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

    if (!Array.isArray(icons)) {
        return null;
    }

    const [icon1, icon2] = icons;

    if (!icon1 || !icon2) {
        return null;
    }

    return (
        <div
            className={classNames(bem('image'), className)}
            aria-hidden="true"
            role="presentation"
        >
            <div
                className={classNames(bem('icon'), bem('icon', 'icon1'))}
                style={{
                    backgroundImage: `url(${getInternalAbsoluteUrl(
                        icon1.icon?.mediaUrl,
                        false
                    )})`,
                    transform: buildTransformStyling(icon1, 'none'),
                }}
            />
            <div
                className={classNames(bem('icon'), bem('icon', 'icon2'))}
                style={{
                    backgroundImage: `url(${getInternalAbsoluteUrl(
                        icon2.icon?.mediaUrl,
                        false
                    )})`,
                    transform: buildTransformStyling(icon2, 'none'),
                }}
            />
        </div>
    );
};
