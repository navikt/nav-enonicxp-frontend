import { LayoutCommonConfig } from '../../types/component-props/layouts';

export const getCommonLayoutStyle = (config: LayoutCommonConfig) => {
    if (!config) {
        return undefined;
    }

    const { backgroundColor, marginTop, marginBottom } = config;

    return {
        ...(marginTop && { marginTop: `${marginTop}rem` }),
        ...(marginBottom && { marginBottom: `${marginBottom}rem` }),
        ...(backgroundColor && {
            backgroundColor,
            paddingTop: '1.25rem',
            paddingBottom: '1.25rem',
        }),
    };
};
