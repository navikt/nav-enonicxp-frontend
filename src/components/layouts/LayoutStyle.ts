import { LayoutCommonConfig } from '../../types/component-props/layouts';

export const getCommonLayoutStyle = (config: LayoutCommonConfig) => {
    if (!config) {
        return undefined;
    }

    const { backgroundColor, marginTop, marginBottom } = config;

    return {
        // Check for undefined specifically. We want to allow margin values of 0
        ...(marginTop !== undefined && { marginTop: `${marginTop}rem` }),
        ...(marginBottom !== undefined && {
            marginBottom: `${marginBottom}rem`,
        }),
        ...(backgroundColor && {
            backgroundColor,
            paddingTop: '1.25rem',
            paddingBottom: '1.25rem',
        }),
    };
};
