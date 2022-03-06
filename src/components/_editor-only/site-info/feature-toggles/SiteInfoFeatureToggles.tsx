import React from 'react';
import {
    EditorFeatureCookie,
    isEditorFeatureEnabled,
    toggleEditorFeature,
} from './utils';
import { Checkbox } from '@navikt/ds-react';
import { SiteInfoSubHeader } from '../_common/sub-header/SiteInfoSubHeader';

const featureProps = [
    {
        cookie: EditorFeatureCookie.HideLeftPanel,
        description:
            'Skjul venstre-panel i editoren på komponent-baserte sider',
    },
    {
        cookie: EditorFeatureCookie.ReduceReloads,
        description: 'Hindre automatiske reloads i komponent-editoren',
    },
    {
        cookie: EditorFeatureCookie.ConcurrentEditorWarning,
        description:
            'Varsling dersom flere redaktører gjør endringer på samme innhold',
    },
];

export const SiteInfoFeatureToggles = () => {
    return (
        <div>
            <SiteInfoSubHeader text={'Eksperimentell funksjonalitet'} />
            {featureProps.map(({ cookie, description }) => {
                return (
                    <Checkbox
                        size={'small'}
                        key={cookie}
                        defaultChecked={isEditorFeatureEnabled(cookie)}
                        onChange={() => toggleEditorFeature(cookie)}
                    >
                        {description}
                    </Checkbox>
                );
            })}
        </div>
    );
};
