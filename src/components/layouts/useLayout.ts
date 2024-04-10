import { usePageContentProps } from 'store/pageContext';
import { LayoutProps } from 'types/component-props/layouts';
import { ContentProps } from 'types/content-props/_content-common';
import { BEM, classNames } from 'utils/classnames';
import { editorAuthstateClassname } from 'components/_common/auth-dependant-render/AuthDependantRender';
import { LayoutCommonConfigMixin } from 'types/component-props/_mixins';

import style from './LayoutContainer.module.scss';

const buildStylesFromEditorialConfig = (config: LayoutCommonConfigMixin) => {
    if (!config) {
        return undefined;
    }

    const { bgColor, marginTop, marginBottom, paddingSides, paddingTopBottom } = config;

    return {
        // Check for undefined specifically. We want to allow margin values of 0
        ...(marginTop !== undefined && { marginTop: `${marginTop}rem` }),
        ...(marginBottom !== undefined && {
            marginBottom: `${marginBottom}rem`,
        }),
        ...(bgColor && { backgroundColor: bgColor.color }),
        ...(paddingSides?._selected === 'custom' &&
            paddingSides.custom?.remValue && {
                paddingLeft: `${paddingSides.custom.remValue}rem`,
                paddingRight: `${paddingSides.custom.remValue}rem`,
            }),
        ...(paddingTopBottom?._selected === 'custom' && {
            ...(paddingTopBottom.custom?.top && {
                paddingTop: `${paddingTopBottom.custom.top}rem`,
            }),
            ...(paddingTopBottom.custom?.bottom && {
                paddingBottom: `${paddingTopBottom.custom.bottom}rem`,
            }),
        }),
    };
};

const getPaddingConfig = (config: string) => {
    if (config === 'fullWidth') {
        return style.fullwidth;
    }

    if (config === 'standard') {
        return style.standard;
    }
};

type Props = {
    pageProps: ContentProps;
    layoutProps: LayoutProps;
    layoutStyle?: React.CSSProperties;
    modifiers?: string[];
} & React.HTMLAttributes<HTMLDivElement>;

export const useLayout = ({
    pageProps,
    layoutProps,
    layoutStyle,
    modifiers,
    className,
    ...elementAttr
}: Props) => {
    const { editorView } = usePageContentProps();
    const { descriptor, path, type, config = {} } = layoutProps;
    const layoutName = descriptor.split(':')[1];
    const stylesFromEditorialConfig = buildStylesFromEditorialConfig(config);
    const paddingConfig = config.paddingSides?._selected;
    const editorAttr = !!pageProps.editorView
        ? {
              'data-portal-component-type': type,
              'data-portal-component': path,
          }
        : undefined;
    const bem = BEM(type);
    return {
        elementAttr: { ...elementAttr, editorAttr },
        className: classNames(
            style.layout,
            bem(layoutName),
            ...(modifiers ? modifiers.map((mod) => bem(layoutName, mod)) : []),
            getPaddingConfig(paddingConfig),
            config.bgColor?.color && style.bg,
            editorView === 'edit' && editorAuthstateClassname(config.renderOnAuthState),
            className
        ),
        style: { ...stylesFromEditorialConfig, ...layoutStyle },
    };
};
