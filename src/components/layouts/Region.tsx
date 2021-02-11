import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { BEM, classNames } from '../../utils/classnames';
import { ComponentMapper } from '../ComponentMapper';
import { RegionProps } from '../../types/component-props/layouts';

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
    const { name, components } = regionProps;

    return (
        <div
            style={regionStyle}
            className={classNames(
                bem(),
                bem(name),
                bemModifier && bem(name, bemModifier)
            )}
            data-portal-region={pageProps.editMode ? name : undefined}
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
