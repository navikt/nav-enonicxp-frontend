import Cookie from 'js-cookie';

export enum EditorFeatureCookie {
    HideLeftPanel = 'hide-left-panel',
}

export const isEditorFeatureEnabled = (feature: EditorFeatureCookie) =>
    Cookie.get(feature) === 'true';

export const setEditorFeatureToggle = (
    feature: EditorFeatureCookie,
    enable: boolean
) => {
    Cookie.set(feature, enable, {
        expires: 365,
    });
};
