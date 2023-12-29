import React, { useEffect, useId, useRef } from 'react';
import {
    AnimatedIcon,
    AnimatedIconsProps,
} from 'types/content-props/animated-icons';
import { getMediaUrl } from 'utils/urls';
import { classNames } from 'utils/classnames';
import { buildImageCacheUrl, NextImageProps } from '../image/NextImage';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { XpImage } from 'components/_common/image/XpImage';
import { useSWRImmutableOnScrollIntoView } from 'utils/fetch/useSWRImmutableOnScrollIntoView';

import styleCommon from './Illustration.module.scss';
import styleStatic from './IllustrationStatic.module.scss';

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
    icon: AnimatedIcon;
    isEditorView: boolean;
    className?: string;
}) => {
    const { pageConfig } = usePageConfig();

    const ref = useRef<HTMLSpanElement>();

    // We inline svg data into the html to allow us to easily style it with CSS
    // Other formats are treated as a regular img
    const isSvg = icon.icon.mediaUrl.endsWith('svg');

    const elementId = useId();

    const { data: svgData } = useSWRImmutableOnScrollIntoView({
        url: isSvg
            ? buildImageCacheUrl({
                  ...nextImageProps,
                  src: getMediaUrl(icon.icon.mediaUrl, !!pageConfig.editorView),
                  isEditorView,
              })
            : null,
        fetchFunc: fetchSvgData,
        elementId,
    });

    useEffect(() => {
        if (svgData) {
            ref.current.innerHTML = svgData;
        }
    }, [svgData]);

    return (
        <span
            className={classNames(styleStatic.icon, className)}
            id={elementId}
            ref={ref}
        >
            {!isSvg && <XpImage imageProps={icon.icon} alt={''} />}
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
            aria-hidden={'true'}
        >
            {hasIcon1 && (
                <StaticIcon
                    icon={icon1}
                    isEditorView={isEditorView}
                    className={'back'}
                />
            )}
            {hasIcon2 && (
                <StaticIcon
                    icon={icon2}
                    isEditorView={isEditorView}
                    className={'front'}
                />
            )}
        </span>
    );
};
