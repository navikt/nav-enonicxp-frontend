import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { getMediaUrl } from 'utils/urls';
import { classNames } from '../../../utils/classnames';
import style from './Illustration.module.scss';
interface IllustrationStaticProps {
    illustration: AnimatedIconsProps;
    className?: string;
}

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
            className={classNames(style.image, className)}
            aria-hidden="true"
            role="presentation"
        >
            <div
                className={style.icon}
                style={{
                    backgroundImage: `url(${getMediaUrl(
                        icon1.icon?.mediaUrl
                    )})`,
                    transform: buildTransformStyling(icon1, 'none'),
                }}
            />
            <div
                className={style.icon}
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
