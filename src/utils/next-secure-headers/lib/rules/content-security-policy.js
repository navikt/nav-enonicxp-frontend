"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContentSecurityPolicyHeader = exports.createContentSecurityPolicyOptionHeaderValue = exports.convertReportingDirectiveToString = exports.convertDocumentDirectiveToString = exports.convertFetchDirectiveToString = exports.createDirectiveValue = exports.getProperHeaderName = void 0;
const shared_1 = require("./shared");
const headerName = "Content-Security-Policy";
const reportOnlyHeaderName = "Content-Security-Policy-Report-Only";
const directiveValueSepartor = "; ";
exports.getProperHeaderName = (reportOnly = false) => (reportOnly ? reportOnlyHeaderName : headerName);
exports.createDirectiveValue = (directiveName, value, arrayWrapper = shared_1.wrapArray) => {
    const values = arrayWrapper(value);
    return `${directiveName} ${values.join(" ")}`;
};
const fetchDirectiveNamesByKey = {
    childSrc: "child-src",
    connectSrc: "connect-src",
    defaultSrc: "default-src",
    fontSrc: "font-src",
    frameSrc: "frame-src",
    imgSrc: "img-src",
    manifestSrc: "manifest-src",
    mediaSrc: "media-src",
    prefetchSrc: "prefetch-src",
    objectSrc: "object-src",
    scriptSrc: "script-src",
    scriptSrcElem: "script-src-elem",
    scriptSrcAttr: "script-src-attr",
    styleSrc: "style-src",
    styleSrcElem: "style-src-elem",
    styleSrcAttr: "style-src-attr",
    workerSrc: "worker-src",
    frameAncestors: "frame-ancestors",
};
exports.convertFetchDirectiveToString = (directive) => {
    if (directive == undefined)
        return "";
    const strings = [];
    Object.entries(directive).forEach(([key, value]) => {
        if (value == undefined)
            return;
        const directiveName = fetchDirectiveNamesByKey[key];
        strings.push(exports.createDirectiveValue(directiveName, shared_1.wrapArray(value)));
    });
    return strings.join(directiveValueSepartor);
};
exports.convertDocumentDirectiveToString = (directive) => {
    if (directive == undefined)
        return "";
    const strings = [];
    if (directive.baseURI != undefined)
        strings.push(exports.createDirectiveValue("base-uri", shared_1.wrapArray(directive.baseURI)));
    if (directive.pluginTypes != undefined)
        strings.push(exports.createDirectiveValue("plugin-types", shared_1.wrapArray(directive.pluginTypes)));
    if (directive.sandbox != undefined) {
        const directiveName = "sandbox";
        const value = directive.sandbox === true ? directiveName : exports.createDirectiveValue(directiveName, directive.sandbox);
        strings.push(value);
    }
    return strings.join(directiveValueSepartor);
};
exports.convertReportingDirectiveToString = (directive) => {
    if (directive == undefined)
        return "";
    const strings = [];
    if (directive.navigateTo != undefined)
        strings.push(exports.createDirectiveValue("navigate-to", shared_1.wrapArray(directive.navigateTo)));
    if (directive.reportURI != undefined) {
        const reportURI = shared_1.wrapArray(directive.reportURI).map(shared_1.encodeStrictURI);
        strings.push(exports.createDirectiveValue("report-uri", reportURI));
    }
    if (directive.reportTo != undefined)
        strings.push(exports.createDirectiveValue("report-to", JSON.stringify(directive.reportTo)));
    return strings.join(directiveValueSepartor);
};
exports.createContentSecurityPolicyOptionHeaderValue = (option, fetchDirectiveToStringConverter = exports.convertFetchDirectiveToString, documentDirectiveToStringConverter = exports.convertDocumentDirectiveToString, reportingDirectiveToStringConverter = exports.convertReportingDirectiveToString) => {
    if (option == undefined)
        return;
    if (option === false)
        return;
    return [
        fetchDirectiveToStringConverter(option.directives),
        documentDirectiveToStringConverter(option.directives),
        reportingDirectiveToStringConverter(option.directives),
    ]
        .filter((string) => string.length > 0)
        .join(directiveValueSepartor);
};
exports.createContentSecurityPolicyHeader = (option, properHeaderNameGetter = exports.getProperHeaderName, headerValueCreator = exports.createContentSecurityPolicyOptionHeaderValue) => {
    if (option == undefined)
        return;
    if (option === false)
        return;
    const headerName = properHeaderNameGetter(option.reportOnly);
    const value = headerValueCreator(option);
    return { name: headerName, value };
};
