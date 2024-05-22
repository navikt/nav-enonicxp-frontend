import React, { useId } from 'react';
import { AnimatedIcon, AnimatedIconsProps } from 'types/content-props/animated-icons';
import { usePageContentProps } from 'store/pageContext';
import { getMediaUrl } from 'utils/urls';
import { classNames } from 'utils/classnames';
import { buildImageCacheUrl, NextImageProps } from 'components/_common/image/NextImage';
import { XpImage } from 'components/_common/image/XpImage';
import { useSWRImmutableOnScrollIntoView } from 'utils/fetch/useSWRImmutableOnScrollIntoView';

import styleCommon from 'components/_common/illustration/Illustration.module.scss';
import styleStatic from './IllustrationStatic.module.scss';

type DefinedIcon = Required<NonNullable<AnimatedIcon['icon']>>;
type ValidIcon = DefinedIcon & Required<Pick<DefinedIcon, 'mediaUrl'>>;

type StaticIconProps = {
    icon: ValidIcon;
    isEditorView: boolean;
    className?: string;
};

const isValidIcon = (icon?: AnimatedIcon['icon']): icon is ValidIcon => !!icon?.mediaUrl;

const nextImageProps: NextImageProps = {
    maxWidth: 96,
    quality: 90,
};

const fetchSvgData = (url: string) =>
    fetch(url)
        .then((res) => (res.ok ? res.text() : null))
        .catch((_) => null);

const SvgIcon = ({ icon, isEditorView, className }: StaticIconProps) => {
    const elementId = useId();

    const { data: svgData } = useSWRImmutableOnScrollIntoView({
        url: buildImageCacheUrl({
            ...nextImageProps,
            src: getMediaUrl(icon.mediaUrl, isEditorView),
            isEditorView,
        }),
        fetchFunc: fetchSvgData,
        elementId,
    });

    return (
        <span
            className={className}
            id={elementId}
            dangerouslySetInnerHTML={{
                __html: svgData
                    ? svgData.substring(0, 4) + ' role="img" ' + svgData.substring(4) // Add role="img"
                    : '',
            }}
        />
    );
};

const StaticIcon = (props: StaticIconProps) => {
    const { icon, className } = props;
    const fullClassName = classNames(styleStatic.icon, className);

    // We inline svg data into the html to allow us to easily style it with CSS
    if (icon.mediaUrl.endsWith('svg')) {
        return <SvgIcon {...props} className={fullClassName} />;
    }

    // Other image formats are treated as a regular img
    return (
        <span className={fullClassName}>
            <XpImage imageProps={icon} />
        </span>
    );
};

type Props = {
    illustration?: AnimatedIconsProps;
    className?: string;
};

export const IllustrationStatic = ({ illustration, className }: Props) => {
    const { editorView } = usePageContentProps();

    if (!illustration) {
        return null;
    }

    const { icons } = illustration.data;
    if (!Array.isArray(icons) || icons.length === 0) {
        return null;
    }

    const [icon1, icon2] = icons;

    return (
        <span className={classNames(styleCommon.image, className)} aria-hidden={'true'}>
            {isValidIcon(icon1?.icon) && (
                <StaticIcon icon={icon1.icon} isEditorView={!!editorView} className={'back'} />
            )}
            {isValidIcon(icon2?.icon) && (
                <StaticIcon icon={icon2.icon} isEditorView={!!editorView} className={'front'} />
            )}
        </span>
    );
};
