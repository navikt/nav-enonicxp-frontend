import { adminOrigin } from '../../../utils/urls';
import { fetchJson } from '../../../utils/fetch/fetch-utils';
import { ContentProps } from '../../../types/content-props/_content-common';
import { Branch } from '../../../types/branch';

const adminAuthUrl = `${adminOrigin}/admin/rest/auth/authenticated`;
const userInfoUrl = `${adminOrigin}/admin/rest-v2/cs/security/principals/user:`;
const contentServiceUrl = `${adminOrigin}/admin/tool/com.enonic.app.contentstudio/main/_/service/com.enonic.app.contentstudio/content`;
const versionsUrl = `${adminOrigin}/admin/rest-v2/cs/cms/default/content/content/getVersionsForView`;

type UserInfo = {
    key: string;
    displayName: string;
};

type AdminAuthResponse = {
    authenticated: boolean;
    user: UserInfo;
};

export type ContentWorkflowState = 'READY' | 'IN_PROGRESS';

export type AdminContentResponse = ContentProps & {
    workflow: { state: ContentWorkflowState };
    modifier: string;
};

export const fetchAdminUserId = () =>
    fetchJson<AdminAuthResponse>(adminAuthUrl, 5000).then((res) => {
        return res?.user?.key;
    });

export const fetchAdminContent = async (contentId: string) =>
    fetchJson<AdminContentResponse>(
        `${contentServiceUrl}?contentId=${contentId}`,
        5000
    );

export const fetchUserInfo = async (userId: string) =>
    fetchJson<UserInfo>(`${userInfoUrl}${userId}?memberships=false`, 5000);

type VersionsResponse = {
    contentVersions?: Array<{
        publishInfo?: {
            publisher: string;
            publisherDisplayName: string;
            type: 'PUBLISHED' | 'UNPUBLISHED';
        };
    }>;
};

export const editorFetchVersions = async (contentId: string) =>
    fetchJson<VersionsResponse>(versionsUrl, 5000, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ contentId, size: -1 }),
    });
