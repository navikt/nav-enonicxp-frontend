import { adminOrigin } from '../../../utils/urls';
import { fetchJson } from '../../../utils/fetch/fetch-utils';
import { ContentProps } from '../../../types/content-props/_content-common';

const adminAuthUrl = `${adminOrigin}/admin/rest/auth/authenticated`;
const userInfoUrl = `${adminOrigin}/admin/rest-v2/cs/security/principals/user:`;
const contentServiceUrl = `${adminOrigin}/admin/tool/com.enonic.app.contentstudio/main/_/service/com.enonic.app.contentstudio/content`;
const versionsUrl = `${adminOrigin}/admin/rest-v2/cs/cms/default/content/content/getVersionsForView`;

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

type VersionsResponse = {
    activeVersion?: {
        contentVersion?: {
            modifierDisplayName: string;
            publishInfo?: {
                publisherDisplayName: string;
            };
        };
    };
};

export const editorFetchAdminUserId = () =>
    fetchJson<AdminAuthResponse>(adminAuthUrl, 5000).then((res) => {
        return res?.user?.key;
    });

export const editorFetchAdminContent = async (contentId: string) =>
    fetchJson<AdminContentResponse>(
        `${contentServiceUrl}?contentId=${contentId}`,
        5000
    );

export const editorFetchUserInfo = async (userId: string) =>
    fetchJson<UserInfo>(`${userInfoUrl}${userId}?memberships=false`, 5000);

export const editorFetchVersions = async (contentId: string) =>
    fetchJson<VersionsResponse>(versionsUrl, 5000, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ contentId, size: -1 }),
    });
