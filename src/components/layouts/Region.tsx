import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { BEM, classNames } from '../../utils/classnames';
import { ComponentMapper } from '../ComponentMapper';
import { RegionProps } from '../../types/component-props/layouts';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

type Props = {
    pageProps: ContentProps;
    regionProps: RegionProps;
    regionStyle?: React.CSSProperties;
    bemModifier?: string;
    helpText?: string;
};

const bem = BEM('region');

export const Region = ({
    pageProps,
    regionProps,
    regionStyle,
    bemModifier,
    helpText,
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
        >
            {helpText && (
                <div>
                    {helpText && (
                        <EditorHelp text={helpText} type={'arrowDown'} />
                    )}
                </div>
            )}
            <div
                data-portal-region={!!pageProps.editorView ? name : undefined}
                className="regionContainer"
            >
                {components.map((component) => (
                    <ComponentMapper
                        key={component.path}
                        componentProps={component}
                        pageProps={pageProps}
                    />
                ))}
            </div>
        </div>
    );
};

export default Region;
