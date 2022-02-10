import { adminOrigin } from '../../../../utils/urls';
import { fetchWithTimeout } from '../../../../utils/fetch-utils';
import { ContentProps } from '../../../../types/content-props/_content-common';

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

export const fetchAdminUserId = (): Promise<string | null> =>
    fetchWithTimeout(adminAuthUrl, 5000)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status} - ${res.statusText}`);
        })
        .then((jsonRes: AdminAuthResponse) => {
            if (jsonRes?.authenticated) {
                return jsonRes.user?.key;
            }
            throw new Error('User is not authenticated');
        })
        .catch((e) => {
            console.error(`Failed to fetch admin auth api - ${e}`);
            return null;
        });

export type ContentWorkflowState = 'READY' | 'IN_PROGRESS';

export type CsContentApiResponse = ContentProps & {
    workflow: { state: ContentWorkflowState };
    modifier: string;
};

export const fetchAdminContent = async (
    contentId: string
): Promise<CsContentApiResponse | null> =>
    fetchWithTimeout(
        `${adminOrigin}${parent.window.CONFIG?.services?.contentUrl}?contentId=${contentId}`,
        5000
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(`${res.status} - ${res.statusText}`);
        })
        .catch((e) => {
            console.error(`Error fetching from admin content api - ${e}`);
            return null;
        });

export const fetchUserInfo = async (
    userId: string
): Promise<UserInfo | null> => {
    return fetchWithTimeout(`${userInfoUrl}${userId}?memberships=false`, 5000)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`${res.status} - ${res.statusText}`);
        })
        .catch((e) => {
            console.error(`Error fetching from user info api - ${e}`);
            return null;
        });
};

// TODO: make a resolveJson function and refactor
