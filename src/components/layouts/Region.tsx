import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { BEM, classNames } from '../../utils/classnames';
import { ComponentMapper } from '../ComponentMapper';
import { RegionProps } from '../../types/component-props/layouts';
import { EditorHelp } from 'components/_common/editor-help/EditorHelp';

type Props = {
    pageProps: ContentProps;
    regionProps: RegionProps;
    regionStyle?: React.CSSProperties;
    bemModifier?: string;
};

const bem = BEM('region');

export const Region = ({
    pageProps,
    regionProps,
    regionStyle,
    bemModifier,
}: Props) => {
    if (!regionProps) {
        return (
            <EditorHelp
                text={'Error: missing region props, could not render region'}
                type={'error'}
            />
        );
    }

    const { name, components } = regionProps;

    return (
        <div
            style={regionStyle}
            className={classNames(
                bem(),
                bem(name),
                bemModifier && bem(name, bemModifier)
            )}
            data-portal-region={!!pageProps.editorView ? name : undefined}
        >
            {components.map((component) => (
                <ComponentMapper
                    key={component.path}
                    componentProps={component}
                    pageProps={pageProps}
                />
            ))}
        </div>
    );
};

export default Region;
