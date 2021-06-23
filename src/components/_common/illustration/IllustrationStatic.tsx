import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { getMediaUrl } from 'utils/urls';
import { BEM, classNames } from '../../../utils/classnames';

import './Illustration.less';
interface IllustrationStaticProps {
    illustration: AnimatedIconsProps;
    className: string;
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
                    backgroundImage: `url(${getMediaUrl(
                        icon1.icon?.mediaUrl
                    )})`,
                    transform: buildTransformStyling(icon1, 'none'),
                }}
            />
            <div
                className={classNames(bem('icon'), bem('icon', 'icon2'))}
                style={{
                    backgroundImage: `url(${getMediaUrl(
                        icon2.icon?.mediaUrl
                    )})`,
                    transform: buildTransformStyling(icon2, 'none'),
                }}
            />
        </div>
    );
};
