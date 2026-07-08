export const htmlAreaInneholderDiv = (node: { descriptor?: string; config?: any }): boolean => {
    if (
        node.descriptor === 'no.nav.navno:html-area' &&
        node.config &&
        typeof node.config === 'object' &&
        typeof node.config.html?.processedHtml === 'string'
    ) {
        return node.config.html.processedHtml.includes('<div');
    }
    return false;
};
