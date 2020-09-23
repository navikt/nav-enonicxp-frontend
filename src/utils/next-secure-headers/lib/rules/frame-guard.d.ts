import type { ResponseHeader } from "../shared";
export declare type FrameGuardOption = false | "deny" | "sameorigin" | ["allow-from", {
    uri: string | URL;
}];
export declare const createXFrameOptionsHeaderValue: (option?: false | "deny" | "sameorigin" | ["allow-from", {
    uri: string | URL;
}] | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined;
export declare const createFrameGuardHeader: (option?: false | "deny" | "sameorigin" | ["allow-from", {
    uri: string | URL;
}] | undefined, headerValueCreator?: (option?: false | "deny" | "sameorigin" | ["allow-from", {
    uri: string | URL;
}] | undefined, strictURIEncoder?: (uri: string | URL) => string) => string | undefined) => ResponseHeader;
