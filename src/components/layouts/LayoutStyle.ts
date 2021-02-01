import { LayoutProps } from '../../types/component-props/layouts';

export const getCommonLayoutStyle = (layoutProps: LayoutProps) => {
    const { backgroundColor, marginTop, marginBottom } = layoutProps.config;

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
