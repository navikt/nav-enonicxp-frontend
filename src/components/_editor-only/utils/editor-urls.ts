export const getPreviewPathForProject = (projectId: string) =>
    `${previewPathPrefix}/${projectId}/draft${xpContentPathPrefix}`;

export const getEditorPathForProject = (projectId: string) =>
    `${contentStudioPathPrefix}/${projectId}/edit`;

export const xpContentPathPrefix = '/www.nav.no';

const previewPathPrefix = '/admin/site/preview';
const contentStudioPathPrefix = '/admin/tool/com.enonic.app.contentstudio/main';
const xpDefaultProjectId = 'default';

export const xpPreviewBasePathDefault =
    getPreviewPathForProject(xpDefaultProjectId);

export const xpEditorBasePathDefault =
    getEditorPathForProject(xpDefaultProjectId);

// Pathname in the inline preview:
// /admin/tool/com.enonic.app.contentstudio/main#/<project id>/browse
const getProjectIdFromInlinePreview = () => {
    return parent.window.location.hash.split('/')[1];
};

// Pathname in the fullscreen preview:
// /admin/site/preview/<project id>/draft/<content path>
const getProjectIdFromFullscreenPreview = () => {
    return parent.window.location.pathname.split('/')[4];
};

// Pathname in the editor view:
// /admin/tool/com.enonic.app.contentstudio/main/<project id>/edit/<content id>
const getProjectIdFromEditorView = () => {
    return parent.window.location.pathname.split('/')[5];
};

export const getProjectIdFromCurrentContentStudioUrl = () => {
    // This is only usable client-side
    if (typeof window === 'undefined') {
        return xpDefaultProjectId;
    }

    const { pathname } = parent.window.location;

    if (pathname.startsWith(previewPathPrefix)) {
        return getProjectIdFromFullscreenPreview();
    }

    if (pathname.startsWith(contentStudioPathPrefix)) {
        return getProjectIdFromEditorView();
    }

    if (pathname === contentStudioPathPrefix) {
        return getProjectIdFromInlinePreview();
    }

    console.error('Could not determine project id from url!');

    return xpDefaultProjectId;
};
