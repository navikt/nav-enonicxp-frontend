import Cookie from 'js-cookie';
import { EditorFeatureProps } from 'components/_editor-only/site-info/feature-toggles/SiteInfoFeatureToggles';

export enum EditorFeature {
    HideLeftPanel = 'hide-left-panel',
    UncheckDependenciesPublish = 'uncheck-dependencies-publish',
}

export const isEditorFeatureEnabled = ({
    cookie,
    defaultValue,
}: EditorFeatureProps) => {
    const cookieValue = Cookie.get(cookie);
    return cookieValue === undefined ? defaultValue : cookieValue === 'true';
};

export const setEditorFeatureToggle = (
    feature: EditorFeature,
    enable: boolean
) => {
    Cookie.set(feature, enable, {
        expires: 365,
    });
};
