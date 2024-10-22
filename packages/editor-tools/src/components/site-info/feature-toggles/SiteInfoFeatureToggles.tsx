import React from 'react';
import { Checkbox } from '@navikt/ds-react';
import {
    isEditorFeatureEnabled,
    setEditorFeatureToggle,
} from 'components/_editor-only/site-info/feature-toggles/editor-feature-toggles-utils';
import { SiteInfoSubHeader } from 'components/_editor-only/site-info/_common/sub-header/SiteInfoSubHeader';

export enum EditorFeature {
    HideLeftPanel = 'hide-left-panel',
    EditorReloadBlocker = 'editor-reload-blocker',
    ContentModifiedWarning = 'content-modified-warning',
}

export type EditorFeatureProps = {
    key: EditorFeature;
    description: string;
    defaultValue: boolean;
};

export const editorFeatures: Record<EditorFeature, EditorFeatureProps> = {
    [EditorFeature.HideLeftPanel]: {
        key: EditorFeature.HideLeftPanel,
        description: 'Skjuler venstre-panelet i editoren som standard på komponent-baserte sider',
        defaultValue: false,
    },
    [EditorFeature.EditorReloadBlocker]: {
        key: EditorFeature.EditorReloadBlocker,
        description:
            'Hindrer editoren fra å reloades når andre gjør endringer på innholdet du jobber med',
        defaultValue: true,
    },
    [EditorFeature.ContentModifiedWarning]: {
        key: EditorFeature.ContentModifiedWarning,
        description:
            'Viser advarsel når noen andre gjør endringer på innholdet du jobber med. Obs: Denne krever at funksjonaliteten over også er slått på!',
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
                            setEditorFeatureToggle(key, e.currentTarget.checked);
                        }}
                    >
                        {description}
                    </Checkbox>
                );
            })}
        </div>
    );
};
