import Cookie from 'js-cookie';
import {
    EditorFeature,
    editorFeatures,
} from 'components/_editor-only/site-info/feature-toggles/SiteInfoFeatureToggles';

export const isEditorFeatureEnabled = (feature: EditorFeature) => {
    const { cookie, defaultValue } = editorFeatures[feature];

    const cookieValue = Cookie.get(cookie);

    return cookieValue === undefined ? defaultValue : cookieValue === 'true';
};

export const setEditorFeatureToggle = (
    feature: EditorFeature,
    enable: boolean
) => Cookie.set(feature, enable, { expires: 365 });
