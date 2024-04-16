import React from 'react';
import dynamic from 'next/dynamic';
import { useXpComponentsConfig } from 'components/xp-components/xpComponentsConfig';
import { PartComponentProps } from 'types/component-props/parts';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

const PartsMapperFallback = dynamic(() =>
    import('components/parts/PartsMapper').then((module) => module.PartsMapper)
);

type Props = {
    partProps: PartComponentProps;
};

export const XpPartComponent = ({ partProps }: Props) => {
    const { parts, useGlobalFallback } = useXpComponentsConfig();

    const Component = parts[partProps.descriptor];
    if (Component) {
        return <Component {...partProps} />;
    }

    return useGlobalFallback ? (
        <PartsMapperFallback partProps={partProps} />
    ) : (
        <EditorHelp
            text={`Part-komponenten "${partProps.descriptor}" kan ikke benyttes på denne sidetypen`}
        />
    );
};
