import { adminOrigin } from '../../../utils/urls';
import { fetchJson } from '../../../utils/fetch-utils';
import { ContentProps } from '../../../types/content-props/_content-common';

const adminAuthUrl = `${adminOrigin}/admin/rest/auth/authenticated`;
const userInfoUrl = `${adminOrigin}/admin/rest-v2/cs/security/principals/user:`;

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
        `${adminOrigin}${parent.window.CONFIG?.services?.contentUrl}?contentId=${contentId}`,
        5000
    );

export const fetchUserInfo = async (userId: string) =>
    fetchJson<UserInfo>(`${userInfoUrl}${userId}?memberships=false`, 5000);
