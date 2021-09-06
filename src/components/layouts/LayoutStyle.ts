import { LayoutCommonConfigMixin } from '../../types/component-props/_mixins';

export const getCommonLayoutStyle = (
    config: LayoutCommonConfigMixin,
    isEditMode?: boolean
) => {
    if (!config) {
        return undefined;
    }

    const {
        bgColor,
        marginTop,
        marginBottom,
        paddingSides,
        renderOnAuthState,
    } = config;

    return {
        // Check for undefined specifically. We want to allow margin values of 0
        ...(marginTop !== undefined && { marginTop: `${marginTop}rem` }),
        ...(marginBottom !== undefined && {
            marginBottom: `${marginBottom}rem`,
        }),
        ...(bgColor && { backgroundColor: bgColor.color }),
        ...(paddingSides?._selected === 'custom' && {
            paddingLeft: `${paddingSides.custom?.remValue}rem`,
            paddingRight: `${paddingSides.custom?.remValue}rem`,
        }),
        ...(isEditMode && {
            ...(renderOnAuthState === 'loggedIn' && {
                boxShadow: '0 0 0 2px green',
            }),
            ...(renderOnAuthState === 'loggedOut' && {
                boxShadow: '0 0 0 2px red',
            }),
        }),
    };
};
