import { logger } from '@/shared/logger';
import { fetchJson } from '@/shared/fetch-utils';
import { adminOrigin } from 'utils/urls';
import { ContentProps } from 'types/content-props/_content-common';

const ADMIN_AUTH_URL = `${adminOrigin}/admin/rest/auth/authenticated`;
const USER_INFO_URL = `${adminOrigin}/admin/rest-v2/cs/security/principals/user:`;

const CONTENT_REPO_PREFIX = 'com.enonic.cms.';

// The pathname in the editor view looks like this:
// /admin/tool/com.enonic.app.contentstudio/main/<project id>/edit/<content id>
const getProjectIdFromCurrentEditorUrl = () =>
    typeof window !== 'undefined' && parent.window.location.pathname.split('/')[5];

// Content repo-ids look like this: com.enonic.cms.<project-id>
const getProjectIdFromRepoId = (repoId: string) => repoId.replace(CONTENT_REPO_PREFIX, '');

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
    fetchJson<AdminAuthResponse>(ADMIN_AUTH_URL, 5000).then((res) => {
        return res?.user?.key;
    });

export const editorFetchAdminContent = async (contentId: string, repoId?: string) => {
    const projectId = repoId ? getProjectIdFromRepoId(repoId) : getProjectIdFromCurrentEditorUrl();

    if (!projectId) {
        logger.error('Could not determine projectId');
        return null;
    }

    return fetchJson<AdminContentResponse>(
        `${getContentServiceUrl(projectId)}?id=${contentId}`,
        5000
    );
};

export const editorFetchUserInfo = async (userId: string) =>
    fetchJson<UserInfo>(`${USER_INFO_URL}${userId}?memberships=false`, 5000);

export const isCurrentEditorRepo = (repoId: string) =>
    getProjectIdFromRepoId(repoId) === getProjectIdFromCurrentEditorUrl();

export const isContentRepo = (repoId?: string) => repoId?.startsWith(CONTENT_REPO_PREFIX);
