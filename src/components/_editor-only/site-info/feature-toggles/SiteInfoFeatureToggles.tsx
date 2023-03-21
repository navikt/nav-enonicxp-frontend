import React from 'react';
import {
    EditorFeature,
    isEditorFeatureEnabled,
    setEditorFeatureToggle,
} from './utils';
import { Checkbox } from '@navikt/ds-react';
import { SiteInfoSubHeader } from '../_common/sub-header/SiteInfoSubHeader';

export type EditorFeatureProps = {
    cookie: EditorFeature;
    description: string;
    defaultValue: boolean;
};

export const editorFeatures: Record<EditorFeature, EditorFeatureProps> = {
    [EditorFeature.HideLeftPanel]: {
        cookie: EditorFeature.HideLeftPanel,
        description:
            'Skjuler venstre-panelet i editoren som standard på komponent-baserte sider',
        defaultValue: false,
    },
    [EditorFeature.UncheckDependenciesPublish]: {
        cookie: EditorFeature.UncheckDependenciesPublish,
        description: 'Slår av publisering av referanser som standard-valg',
        defaultValue: true,
    },
};

export const SiteInfoFeatureToggles = () => {
    return (
        <div>
            <SiteInfoSubHeader text={'Eksperimentell funksjonalitet'} />
            {Object.values(editorFeatures).map((feature) => {
                const { description, cookie } = feature;

                return (
                    <Checkbox
                        size={'small'}
                        key={cookie}
                        defaultChecked={isEditorFeatureEnabled(feature)}
                        onClick={(e) => {
                            setEditorFeatureToggle(
                                cookie,
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
