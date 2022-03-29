import React from 'react';
import {
    EditorFeatureCookie,
    isEditorFeatureEnabled,
    setEditorFeatureToggle,
} from './utils';
import { Checkbox } from '@navikt/ds-react';
import { SiteInfoSubHeader } from '../_common/sub-header/SiteInfoSubHeader';

const featureProps = [
    {
        cookie: EditorFeatureCookie.HideLeftPanel,
        description:
            'Skjuler venstre-panelet i editoren som standard på komponent-baserte sider',
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
