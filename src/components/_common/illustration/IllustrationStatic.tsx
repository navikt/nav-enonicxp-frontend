import React from 'react';
import {
    AnimatedIcon,
    AnimatedIconsProps,
} from 'types/content-props/animated-icons';
import { getMediaUrl } from 'utils/urls';
import { classNames } from 'utils/classnames';
import { buildImageCacheUrl, NextImageProps } from '../image/NextImage';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styleCommon from './Illustration.module.scss';
import styleStatic from './IllustrationStatic.module.scss';

interface IllustrationStaticProps {
    illustration: AnimatedIconsProps;
    className?: string;
}

const nextImageProps: NextImageProps = {
    maxWidth: 96,
    quality: 90,
};

const StaticIcon = ({
    icon,
    isEditorView,
}: {
    icon: AnimatedIcon;
    isEditorView: boolean;
}) => (
    <span
        className={styleStatic.icon}
        style={{
            backgroundImage: `url(${buildImageCacheUrl({
                ...nextImageProps,
                src: getMediaUrl(icon.icon.mediaUrl),
                isEditorView,
            })})`,
            transform: icon.transformStart || 'non',
        }}
    />
);

export const IllustrationStatic = ({
    illustration,
    className,
}: IllustrationStaticProps) => {
    const { pageConfig } = usePageConfig();

    if (!illustration) {
        return null;
    }

    const { icons } = illustration.data;
    if (!Array.isArray(icons)) {
        return null;
    }

    const [icon1, icon2] = icons;

    const hasIcon1 = !!icon1?.icon?.mediaUrl;
    const hasIcon2 = !!icon2?.icon?.mediaUrl;

    if (!hasIcon1 && !hasIcon2) {
        return null;
    }

    const isEditorView = !!pageConfig.editorView;

    return (
        <span
            className={classNames(styleCommon.image, className)}
            aria-hidden="true"
        >
            {hasIcon1 && (
                <StaticIcon icon={icon1} isEditorView={isEditorView} />
            )}
            {hasIcon2 && (
                <StaticIcon icon={icon2} isEditorView={isEditorView} />
            )}
        </span>
    );
};
