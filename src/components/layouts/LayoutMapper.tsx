import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutProps, LayoutType } from '../../types/component-props/layouts';
import { FixedColsLayout } from './fixed-cols/FixedColsLayout';
import { FlexColsLayout } from './flex-cols/FlexColsLayout';
import { BEM } from '../../utils/bem';
import { LegacyLayout } from './legacy/LegacyLayout';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LayoutProps;
};

const layoutComponents: {
    [key in LayoutType]: React.FunctionComponent<Props>;
} = {
    [LayoutType.Main]: LegacyLayout,
    [LayoutType.Main1Col]: LegacyLayout,
    [LayoutType.MainPage]: LegacyLayout,
    [LayoutType.Dynamic2Col]: FixedColsLayout,
    [LayoutType.Dynamic3Col]: FixedColsLayout,
    [LayoutType.Dynamic4Col]: FixedColsLayout,
    [LayoutType.DynamicFlexCols]: FlexColsLayout,
};

const getLayoutStyle = (layoutProps: LayoutProps): React.CSSProperties => {
    switch (layoutProps.descriptor) {
        case LayoutType.Dynamic2Col:
        case LayoutType.Dynamic3Col:
        case LayoutType.Dynamic4Col:
            const { margin } = layoutProps.config;
            return margin && { margin };
        case LayoutType.DynamicFlexCols:
            const { bgColor, bgFullWidth } = layoutProps.config;
            return (
                bgColor && {
                    backgroundColor: bgColor,
                    ...(bgFullWidth && {
                        width: '100vw',
                    }),
                }
            );
        default:
            return undefined;
    }
};

export const LayoutMapper = ({ pageProps, layoutProps }: Props) => {
    const { descriptor, path, type } = layoutProps;

    const Component = layoutComponents[descriptor];

    if (!Component) {
        return <div>{`Unimplemented layout type: ${descriptor}`}</div>;
    }

    const bem = BEM(type);
    const layoutName = descriptor.split(':')[1];

    const editorProps = pageProps.editMode
        ? {
              'data-portal-component-type': type,
              'data-portal-component': path,
              'data-th-remove': 'tag',
          }
        : undefined;

    return (
        <div
            className={`${bem()} ${bem(layoutName)}`}
            style={getLayoutStyle(layoutProps)}
            {...editorProps}
        >
            <Component pageProps={pageProps} layoutProps={layoutProps} />
        </div>
    );
};

export default LayoutMapper;
