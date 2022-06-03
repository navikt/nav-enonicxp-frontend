import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { getMediaUrl } from 'utils/urls';
import { classNames } from '../../../utils/classnames';
import { buildImageCacheUrl } from '../image/NextImage';

import styleCommon from './Illustration.module.scss';
import styleStatic from './IllustrationStatic.module.scss';

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

    const bgImage1 = buildImageCacheUrl({
        src: getMediaUrl(icon1.icon?.mediaUrl),
        maxWidth: 96,
        quality: 90,
    });

    const bgImage2 = buildImageCacheUrl({
        src: getMediaUrl(icon2.icon?.mediaUrl),
        maxWidth: 96,
        quality: 90,
    });

    return (
        <div
            className={classNames(styleCommon.image, className)}
            aria-hidden="true"
            role="presentation"
        >
            <div
                className={styleStatic.icon}
                style={{
                    backgroundImage: `url(${bgImage1})`,
                    transform: buildTransformStyling(icon1, 'none'),
                }}
            />
            <div
                className={styleStatic.icon}
                style={{
                    backgroundImage: `url(${bgImage2})`,
                    transform: buildTransformStyling(icon2, 'none'),
                }}
            />
        </div>
    );
};
