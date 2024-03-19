import React, { useId } from 'react';
import {
    AnimatedIcon,
    AnimatedIconsProps,
} from '../../../../types/content-props/animated-icons';
import { getMediaUrl } from '../../../../utils/urls';
import { classNames } from '../../../../utils/classnames';
import { buildImageCacheUrl, NextImageProps } from '../../image/NextImage';
import { usePageConfig } from '../../../../store/hooks/usePageConfig';
import { XpImage } from '../../image/XpImage';
import { useSWRImmutableOnScrollIntoView } from '../../../../utils/fetch/useSWRImmutableOnScrollIntoView';

import styleCommon from '../Illustration.module.scss';
import styleStatic from './IllustrationStatic.module.scss';

type DefinedIcon = Required<NonNullable<AnimatedIcon['icon']>>;
type ValidIcon = DefinedIcon & Required<Pick<DefinedIcon, 'mediaUrl'>>;

const isValidIcon = (icon: AnimatedIcon['icon']): icon is ValidIcon =>
    !!icon?.mediaUrl;

const nextImageProps: NextImageProps = {
    maxWidth: 96,
    quality: 90,
};

const fetchSvgData = (url: string) =>
    fetch(url)
        .then((res) => (res.ok ? res.text() : null))
        .catch((_) => null);

const StaticIcon = ({
    icon,
    isEditorView,
    className,
}: {
    icon: ValidIcon;
    isEditorView: boolean;
    className?: string;
}) => {
    const { pageConfig } = usePageConfig();

    // We inline svg data into the html to allow us to easily style it with CSS
    // Other formats are treated as a regular img
    const isSvg = icon.mediaUrl.endsWith('svg');

    const elementId = useId();

    const { data: svgData } = useSWRImmutableOnScrollIntoView({
        url: isSvg
            ? buildImageCacheUrl({
                  ...nextImageProps,
                  src: getMediaUrl(icon.mediaUrl, !!pageConfig.editorView),
                  isEditorView,
              })
            : null,
        fetchFunc: fetchSvgData,
        elementId,
    });

    return (
        <span
            className={classNames(styleStatic.icon, className)}
            id={elementId}
            dangerouslySetInnerHTML={{ __html: svgData || '' }}
        >
            {!isSvg && <XpImage imageProps={icon} alt={''} />}
        </span>
    );
};

type Props = {
    illustration?: AnimatedIconsProps;
    className?: string;
};

export const IllustrationStatic = ({ illustration, className }: Props) => {
    const { pageConfig } = usePageConfig();

    if (!illustration) {
        return null;
    }

    const { icons } = illustration.data;
    if (!Array.isArray(icons) || icons.length === 0) {
        return null;
    }

    const [icon1, icon2] = icons;

    const isEditorView = !!pageConfig.editorView;

    return (
        <span
            className={classNames(styleCommon.image, className)}
            aria-hidden={'true'}
        >
            {isValidIcon(icon1.icon) && (
                <StaticIcon
                    icon={icon1.icon}
                    isEditorView={isEditorView}
                    className={'back'}
                />
            )}
            {isValidIcon(icon2.icon) && (
                <StaticIcon
                    icon={icon2.icon}
                    isEditorView={isEditorView}
                    className={'front'}
                />
            )}
        </span>
    );
};
