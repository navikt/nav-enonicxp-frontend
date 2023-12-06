import Cookie from 'js-cookie';

const DID_PARTICIPATE_VALUE = 'done';
const EXPIRE_TIME = 30;

const getCookieKey = (cookieId: string) => `usertest-${cookieId}`;

const getCookie = (cookieId: string) => Cookie.get(getCookieKey(cookieId));

const setCookie = (cookieId: string, value: string) =>
    Cookie.set(getCookieKey(cookieId), value, { expires: EXPIRE_TIME });

export const userTestSetSelection = (cookieId: string, variantId: string) =>
    setCookie(cookieId, variantId);

export const userTestGetSelectedVariantId = (cookieId: string) =>
    getCookie(cookieId);

export const userTestSetParticipation = (cookieId: string) =>
    setCookie(cookieId, DID_PARTICIPATE_VALUE);

export const userTestDidUserParticipate = (cookieId: string) =>
    getCookie(cookieId) === DID_PARTICIPATE_VALUE;
