import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { BEM, classNames } from 'utils/classnames';
import { ComponentMapper } from 'components/ComponentMapper';
import { RegionProps } from 'types/component-props/layouts';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';

type Props = {
    pageProps: ContentProps;
    regionProps: RegionProps;
    regionStyle?: React.CSSProperties;
    bemModifier?: string;
    as?: React.ElementType<any>;
    wrapperFunction?: (element: React.ReactElement | null, key: string) => React.ReactNode;
};

const bem = BEM('region');

export const Region = ({
    pageProps,
    regionProps,
    regionStyle,
    bemModifier,
    as: Component = 'div',
    wrapperFunction,
    ...divElementProps
}: Props & React.HTMLAttributes<HTMLDivElement>) => {
    if (!regionProps) {
        return (
            <EditorHelp
                text={'Error: missing region props, could not render region'}
                type={'error'}
            />
        );
    }

    const { name, components } = regionProps;

    const isEditView = pageProps.editorView === 'edit';

    return (
        <Component
            {...divElementProps}
            style={regionStyle}
            className={classNames(
                bem(),
                bem(name),
                bemModifier && bem(name, bemModifier),
                divElementProps.className
            )}
            data-portal-region={isEditView ? name : undefined}
        >
            {components.map((component) => {
                return wrapperFunction && !isEditView ? (
                    wrapperFunction(
                        <ComponentMapper componentProps={component} pageProps={pageProps} />,
                        component.path
                    )
                ) : (
                    <ComponentMapper
                        key={component.path}
                        componentProps={component}
                        pageProps={pageProps}
                    />
                );
            })}
        </Component>
    );
};

export default Region;
