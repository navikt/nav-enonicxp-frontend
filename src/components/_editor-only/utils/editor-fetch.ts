import { adminOrigin } from 'utils/urls';
import { fetchJson } from 'utils/fetch/fetch-utils';
import { ContentProps } from 'types/content-props/_content-common';
import { getProjectIdFromCurrentContentStudioUrl } from 'components/_editor-only/utils/editor-urls';

const adminAuthUrl = `${adminOrigin}/admin/rest/auth/authenticated`;
const userInfoUrl = `${adminOrigin}/admin/rest-v2/cs/security/principals/user:`;

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
    const projectId = getProjectIdFromCurrentContentStudioUrl();

    return fetchJson<AdminContentResponse>(
        `${getContentServiceUrl(projectId)}?id=${contentId}`,
        5000
    );
};

export const editorFetchUserInfo = async (userId: string) =>
    fetchJson<UserInfo>(`${userInfoUrl}${userId}?memberships=false`, 5000);
