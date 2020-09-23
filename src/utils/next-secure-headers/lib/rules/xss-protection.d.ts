import type { ResponseHeader } from "../shared";
export declare type XSSProtectionOption = false | "sanitize" | "block-rendering" | ["report", {
    uri: string | URL;
}];
export declare const createXXSSProtectionHeaderValue: (option?: false | "sanitize" | "block-rendering" | ["report", {
    uri: string | URL;
}] | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined;
export declare const createXSSProtectionHeader: (option?: false | "sanitize" | "block-rendering" | ["report", {
    uri: string | URL;
}] | undefined, headerValueCreator?: (option?: false | "sanitize" | "block-rendering" | ["report", {
    uri: string | URL;
}] | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => ResponseHeader;
