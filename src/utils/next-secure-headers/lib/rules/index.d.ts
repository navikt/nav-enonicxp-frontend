export type { ContentSecurityPolicyOption } from "./content-security-policy";
export type { ExpectCTOption } from "./expect-ct";
export type { ForceHTTPSRedirectOption } from "./force-https-redirect";
export type { FrameGuardOption } from "./frame-guard";
export type { NoopenOption } from "./noopen";
export type { NosniffOption } from "./nosniff";
export type { ReferrerPolicyOption } from "./referrer-policy";
export type { XSSProtectionOption } from "./xss-protection";
export declare const rules: {
    createContentSecurityPolicyHeader: (option?: false | {
        directives: Partial<{
            childSrc: string | string[];
            connectSrc: string | string[];
            defaultSrc: string | string[];
            fontSrc: string | string[];
            frameSrc: string | string[];
            imgSrc: string | string[];
            manifestSrc: string | string[];
            mediaSrc: string | string[];
            prefetchSrc: string | string[];
            objectSrc: string | string[];
            scriptSrc: string | string[];
            scriptSrcElem: string | string[];
            scriptSrcAttr: string | string[];
            styleSrc: string | string[];
            styleSrcElem: string | string[];
            styleSrcAttr: string | string[];
            workerSrc: string | string[];
        }> & Partial<{
            baseURI: string | string[];
            pluginTypes: string | string[];
            sandbox: true | "allow-downloads-without-user-activation" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation";
        }> & Partial<{
            navigateTo: string | string[];
            reportURI: string | URL | (string | URL)[];
            reportTo: Record<string, any>;
        }>;
        reportOnly?: boolean | undefined;
    } | undefined, properHeaderNameGetter?: (reportOnly?: boolean) => "Content-Security-Policy" | "Content-Security-Policy-Report-Only", headerValueCreator?: (option?: false | {
        directives: Partial<{
            childSrc: string | string[];
            connectSrc: string | string[];
            defaultSrc: string | string[];
            fontSrc: string | string[];
            frameSrc: string | string[];
            imgSrc: string | string[];
            manifestSrc: string | string[];
            mediaSrc: string | string[];
            prefetchSrc: string | string[];
            objectSrc: string | string[];
            scriptSrc: string | string[];
            scriptSrcElem: string | string[];
            scriptSrcAttr: string | string[];
            styleSrc: string | string[];
            styleSrcElem: string | string[];
            styleSrcAttr: string | string[];
            workerSrc: string | string[];
        }> & Partial<{
            baseURI: string | string[];
            pluginTypes: string | string[];
            sandbox: true | "allow-downloads-without-user-activation" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation";
        }> & Partial<{
            navigateTo: string | string[];
            reportURI: string | URL | (string | URL)[];
            reportTo: Record<string, any>;
        }>;
        reportOnly?: boolean | undefined;
    } | undefined, fetchDirectiveToStringConverter?: (directive?: Partial<{
        childSrc: string | string[];
        connectSrc: string | string[];
        defaultSrc: string | string[];
        fontSrc: string | string[];
        frameSrc: string | string[];
        imgSrc: string | string[];
        manifestSrc: string | string[];
        mediaSrc: string | string[];
        prefetchSrc: string | string[];
        objectSrc: string | string[];
        scriptSrc: string | string[];
        scriptSrcElem: string | string[];
        scriptSrcAttr: string | string[];
        styleSrc: string | string[];
        styleSrcElem: string | string[];
        styleSrcAttr: string | string[];
        workerSrc: string | string[];
    }> | undefined) => string, documentDirectiveToStringConverter?: (directive?: Partial<{
        baseURI: string | string[];
        pluginTypes: string | string[];
        sandbox: true | "allow-downloads-without-user-activation" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation";
    }> | undefined) => string, reportingDirectiveToStringConverter?: (directive?: Partial<{
        navigateTo: string | string[];
        reportURI: string | URL | (string | URL)[];
        reportTo: Record<string, any>;
    }> | undefined) => string) => string | undefined) => import("../shared").ResponseHeader | undefined;
    createExpectCTHeader: (option?: boolean | [true, Partial<{
        maxAge: number;
        enforce: boolean;
        reportURI: string | URL;
    }>] | undefined, headerValueCreator?: (option?: boolean | [true, Partial<{
        maxAge: number;
        enforce: boolean;
        reportURI: string | URL;
    }>] | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => import("../shared").ResponseHeader | undefined;
    createForceHTTPSRedirectHeader: (option?: boolean | [true, Partial<{
        maxAge: number;
        includeSubDomains: boolean;
        preload: boolean;
    }>] | undefined, headerValueCreator?: (option?: boolean | [true, Partial<{
        maxAge: number;
        includeSubDomains: boolean;
        preload: boolean;
    }>] | undefined) => string | undefined) => import("../shared").ResponseHeader;
    createFrameGuardHeader: (option?: false | "deny" | "sameorigin" | ["allow-from", {
        uri: string | URL;
    }] | undefined, headerValueCreator?: (option?: false | "deny" | "sameorigin" | ["allow-from", {
        uri: string | URL;
    }] | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => import("../shared").ResponseHeader;
    createNoopenHeader: (option?: false | "noopen" | undefined, headerValueCreator?: (option?: false | "noopen" | undefined) => string | undefined) => import("../shared").ResponseHeader;
    createNosniffHeader: (option?: false | "nosniff" | undefined, headerValueCreator?: (option?: false | "nosniff" | undefined) => string | undefined) => import("../shared").ResponseHeader;
    createReferrerPolicyHeader: (option?: false | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | ("no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin")[] | undefined, headerValueCreator?: (option?: false | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | ("no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin")[] | undefined) => string | undefined) => import("../shared").ResponseHeader | undefined;
    createXSSProtectionHeader: (option?: false | "sanitize" | "block-rendering" | ["report", {
        uri: string | URL;
    }] | undefined, headerValueCreator?: (option?: false | "sanitize" | "block-rendering" | ["report", {
        uri: string | URL;
    }] | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => import("../shared").ResponseHeader;
};
