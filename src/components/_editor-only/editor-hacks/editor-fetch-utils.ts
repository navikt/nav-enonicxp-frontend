import { adminOrigin } from 'utils/urls';
import { fetchJson } from 'utils/fetch/fetch-utils';
import { ContentProps } from 'types/content-props/_content-common';

const adminAuthUrl = `${adminOrigin}/admin/rest/auth/authenticated`;
const userInfoUrl = `${adminOrigin}/admin/rest-v2/cs/security/principals/user:`;

// The pathname in the editor view looks like this:
// /admin/tool/com.enonic.app.contentstudio/main/<project id>/edit/<content id>
const getProjectIdFromCurrentEditorUrl = () =>
    typeof window !== 'undefined' &&
    parent.window.location.pathname.split('/')[5];

const getContentServiceUrl = (projectId: string) =>
    `${adminOrigin}/admin/rest-v2/cs/cms/${projectId}/content/content`;

type UserInfo = {
    key: string;
    displayName: string;
};

export type ContentWorkflowState = 'READY' | 'IN_PROGRESS';

type AdminAuthResponse = {
    authenticated: boolean;
    user: UserInfo;
};

export type AdminContentResponse = ContentProps & {
    workflow: { state: ContentWorkflowState };
    modifier: string;
};

export const editorFetchAdminUserId = () =>
    fetchJson<AdminAuthResponse>(adminAuthUrl, 5000).then((res) => {
        return res?.user?.key;
    });

export const editorFetchAdminContent = async (contentId: string) => {
    const projectId = getProjectIdFromCurrentEditorUrl();

    return fetchJson<AdminContentResponse>(
        `${getContentServiceUrl(projectId)}?id=${contentId}`,
        5000
    );
};

export const editorFetchUserInfo = async (userId: string) =>
    fetchJson<UserInfo>(`${userInfoUrl}${userId}?memberships=false`, 5000);
