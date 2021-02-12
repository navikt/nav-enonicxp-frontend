import { LayoutCommonConfigMixin } from '../../types/component-props/_mixins';

const backgroundVerticalPadding = '1.25rem';

export const getCommonLayoutStyle = (config: LayoutCommonConfigMixin) => {
    if (!config) {
        return undefined;
    }

    const { backgroundColor, marginTop, marginBottom, paddingSides } = config;

    return {
        // Check for undefined specifically. We want to allow margin values of 0
        ...(marginTop !== undefined && { marginTop: `${marginTop}rem` }),
        ...(marginBottom !== undefined && {
            marginBottom: `${marginBottom}rem`,
        }),
        ...(backgroundColor && {
            backgroundColor,
            paddingTop: backgroundVerticalPadding,
            paddingBottom: backgroundVerticalPadding,
        }),
        ...(paddingSides?._selected === 'custom' && {
            paddingLeft: `${paddingSides.custom?.remValue}rem`,
            paddingRight: `${paddingSides.custom?.remValue}rem`,
        }),
    };
};
