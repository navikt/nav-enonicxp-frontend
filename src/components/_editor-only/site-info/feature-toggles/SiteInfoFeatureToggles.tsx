import React from 'react';
import {
    isEditorFeatureEnabled,
    setEditorFeatureToggle,
} from 'components/_editor-only/site-info/feature-toggles/editor-feature-toggles-utils';
import { Checkbox } from '@navikt/ds-react';
import { SiteInfoSubHeader } from '../_common/sub-header/SiteInfoSubHeader';

export enum EditorFeature {
    HideLeftPanel = 'hide-left-panel',
}

export type EditorFeatureProps = {
    key: EditorFeature;
    description: string;
    defaultValue: boolean;
};

export const editorFeatures: Record<EditorFeature, EditorFeatureProps> = {
    [EditorFeature.HideLeftPanel]: {
        key: EditorFeature.HideLeftPanel,
        description:
            'Skjuler venstre-panelet i editoren som standard på komponent-baserte sider',
        defaultValue: false,
    },
};

export const SiteInfoFeatureToggles = () => {
    return (
        <div>
            <SiteInfoSubHeader text={'Eksperimentell funksjonalitet'} />
            {Object.values(editorFeatures).map((feature) => {
                const { description, key } = feature;

                return (
                    <Checkbox
                        size={'small'}
                        key={key}
                        defaultChecked={isEditorFeatureEnabled(key)}
                        onClick={(e) => {
                            setEditorFeatureToggle(
                                key,
                                e.currentTarget.checked
                            );
                        }}
                    >
                        {description}
                    </Checkbox>
                );
            })}
        </div>
    );
};
