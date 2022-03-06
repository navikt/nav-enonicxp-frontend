import Cookie from 'js-cookie';

export enum EditorFeatureCookie {
    HideLeftPanel = 'hide-left-panel',
    ReduceReloads = 'reduce-reloads',
    ConcurrentEditorWarning = 'concurrent-editor-warning',
}

export const isEditorFeatureEnabled = (feature: EditorFeatureCookie) =>
    Cookie.get(feature) === 'true';

export const toggleEditorFeature = (
    feature: EditorFeatureCookie,
    enable?: boolean
) =>
    Cookie.set(feature, enable ?? !isEditorFeatureEnabled(feature), {
        expires: 365,
    });
