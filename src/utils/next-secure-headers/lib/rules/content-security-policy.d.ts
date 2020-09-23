import type { ResponseHeader } from "../shared";
declare type DirectiveSource = string | string[];
declare type PluginTypes = string | string[];
declare type Sandbox = true | "allow-downloads-without-user-activation" | "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation";
declare type FetchDirective = {
    childSrc: DirectiveSource;
    connectSrc: DirectiveSource;
    defaultSrc: DirectiveSource;
    fontSrc: DirectiveSource;
    frameSrc: DirectiveSource;
    imgSrc: DirectiveSource;
    manifestSrc: DirectiveSource;
    mediaSrc: DirectiveSource;
    prefetchSrc: DirectiveSource;
    objectSrc: DirectiveSource;
    scriptSrc: DirectiveSource;
    scriptSrcElem: DirectiveSource;
    scriptSrcAttr: DirectiveSource;
    styleSrc: DirectiveSource;
    styleSrcElem: DirectiveSource;
    styleSrcAttr: DirectiveSource;
    workerSrc: DirectiveSource;
    frameAncestors: DirectiveSource;
};
declare type DocumentDirective = {
    baseURI: DirectiveSource;
    pluginTypes: PluginTypes;
    sandbox: Sandbox;
};
declare type ReportingDirective = {
    navigateTo: DirectiveSource;
    reportURI: string | URL | (string | URL)[];
    reportTo: Record<string, any>;
};
export declare type ContentSecurityPolicyOption = false | {
    directives: Partial<FetchDirective> & Partial<DocumentDirective> & Partial<ReportingDirective>;
    reportOnly?: boolean;
};
export declare const getProperHeaderName: (reportOnly?: boolean) => "Content-Security-Policy" | "Content-Security-Policy-Report-Only";
export declare const createDirectiveValue: <T>(directiveName: string, value: T | T[], arrayWrapper?: <T_1>(value: T_1 | T_1[]) => T_1[]) => string;
export declare const convertFetchDirectiveToString: (directive?: Partial<FetchDirective> | undefined) => string;
export declare const convertDocumentDirectiveToString: (directive?: Partial<DocumentDirective> | undefined) => string;
export declare const convertReportingDirectiveToString: (directive?: Partial<ReportingDirective> | undefined) => string;
export declare const createContentSecurityPolicyOptionHeaderValue: (option?: false | {
    directives: Partial<FetchDirective> & Partial<DocumentDirective> & Partial<ReportingDirective>;
    reportOnly?: boolean | undefined;
} | undefined, fetchDirectiveToStringConverter?: (directive?: Partial<FetchDirective> | undefined) => string, documentDirectiveToStringConverter?: (directive?: Partial<DocumentDirective> | undefined) => string, reportingDirectiveToStringConverter?: (directive?: Partial<ReportingDirective> | undefined) => string) => string | undefined;
export declare const createContentSecurityPolicyHeader: (option?: false | {
    directives: Partial<FetchDirective> & Partial<DocumentDirective> & Partial<ReportingDirective>;
    reportOnly?: boolean | undefined;
} | undefined, properHeaderNameGetter?: (reportOnly?: boolean) => "Content-Security-Policy" | "Content-Security-Policy-Report-Only", headerValueCreator?: (option?: false | {
    directives: Partial<FetchDirective> & Partial<DocumentDirective> & Partial<ReportingDirective>;
    reportOnly?: boolean | undefined;
} | undefined, fetchDirectiveToStringConverter?: (directive?: Partial<FetchDirective> | undefined) => string, documentDirectiveToStringConverter?: (directive?: Partial<DocumentDirective> | undefined) => string, reportingDirectiveToStringConverter?: (directive?: Partial<ReportingDirective> | undefined) => string) => string | undefined) => ResponseHeader | undefined;
export {};
