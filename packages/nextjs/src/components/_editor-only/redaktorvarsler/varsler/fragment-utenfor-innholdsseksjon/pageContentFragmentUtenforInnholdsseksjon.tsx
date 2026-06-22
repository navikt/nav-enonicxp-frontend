type FragmentSubtreeNode = {
    descriptor?: string;
    [key: string]: unknown;
};

type FragmentConfig = {
    html?: { processedHtml?: unknown };
    content?: { processedHtml?: unknown };
    paragraph?: unknown;
};

const fragmentInneholderInnholdsseksjon = (node: unknown): boolean => {
    if (!node || typeof node !== 'object') {
        return false;
    }

    if (Array.isArray(node)) {
        return node.some(fragmentInneholderInnholdsseksjon);
    }

    const obj = node as FragmentSubtreeNode;
    if (obj.descriptor === 'no.nav.navno:section-with-header') {
        return true;
    }

    return Object.values(obj).some(fragmentInneholderInnholdsseksjon);
};

export const hentFragmentInnholdForVarsel = (node: { fragment?: unknown }) => {
    if (!node.fragment || typeof node.fragment !== 'object') {
        return undefined;
    }

    const config = (node.fragment as { config?: FragmentConfig }).config;

    if (config?.html?.processedHtml !== undefined) {
        return JSON.stringify(config.html.processedHtml);
    }

    if (config?.content?.processedHtml !== undefined) {
        return JSON.stringify(config.content.processedHtml);
    }

    if (config?.paragraph !== undefined) {
        return JSON.stringify(config.paragraph);
    }

    return undefined;
};

export const pageContentFragmentUtenforInnholdsseksjon = (node: {
    path?: string;
    type?: string;
    fragment?: unknown;
}): boolean => {
    if (!node?.path) return false;

    const startsWithPageContent = /^\/pageContent\//;
    const isInContentSection = /^\/pageContent\/\d+\/content\/\d+$/;
    const isInIntroSection = /^\/pageContent\/\d+\/intro\/\d+$/;

    if (node.type !== 'fragment') {
        return false;
    }

    if (fragmentInneholderInnholdsseksjon(node.fragment)) {
        return false;
    }

    return (
        startsWithPageContent.test(node.path) &&
        !isInContentSection.test(node.path) &&
        !isInIntroSection.test(node.path)
    );
};
