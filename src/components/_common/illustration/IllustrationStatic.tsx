import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { getMediaUrl } from 'utils/urls';
import { classNames } from '../../../utils/classnames';
import { buildImageCacheUrl, NextImageProps } from '../image/NextImage';

import styleCommon from './Illustration.module.scss';
import styleStatic from './IllustrationStatic.module.scss';
import { usePageConfig } from '../../../store/hooks/usePageConfig';

interface IllustrationStaticProps {
    illustration: AnimatedIconsProps;
    className?: string;
}

const nextImageProps: NextImageProps = {
    maxWidth: 96,
    quality: 90,
};

export const IllustrationStatic = ({
    illustration,
    className,
}: IllustrationStaticProps) => {
    const { pageConfig } = usePageConfig();

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

    const icon1Url = icon1?.icon?.mediaUrl;
    const icon2Url = icon2?.icon?.mediaUrl;

    if (!icon1Url && !icon2Url) {
        return null;
    }

    return (
        <span
            className={classNames(styleCommon.image, className)}
            aria-hidden="true"
        >
            {icon1Url && (
                <span
                    className={styleStatic.icon}
                    style={{
                        backgroundImage: `url(${buildImageCacheUrl({
                            ...nextImageProps,
                            src: getMediaUrl(icon1Url),
                            isEditorView: !!pageConfig.editorView,
                        })})`,
                        transform: buildTransformStyling(icon1, 'none'),
                    }}
                />
            )}
            {icon2Url && (
                <span
                    className={styleStatic.icon}
                    style={{
                        backgroundImage: `url(${buildImageCacheUrl({
                            ...nextImageProps,
                            src: getMediaUrl(icon2Url),
                            isEditorView: !!pageConfig.editorView,
                        })})`,
                        transform: buildTransformStyling(icon2, 'none'),
                    }}
                />
            )}
        </span>
    );
};
