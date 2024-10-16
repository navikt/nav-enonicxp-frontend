import { LayoutCommonConfigMixin } from 'types/component-props/_mixins';

export const getCommonLayoutStyle = (config: LayoutCommonConfigMixin) => {
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
