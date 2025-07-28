export const htmlAreaIsInPageContentButNotInContentSection = (node: {
    path?: string;
    descriptor?: string;
}): boolean => {
    if (!node?.path) return false;

    const startsWithPageContent = /^\/pageContent\//;
    const isInContentSection = /^\/pageContent\/\d+\/content\/\d+$/;

    return (
        node.descriptor === 'no.nav.navno:html-area' &&
        startsWithPageContent.test(node.path) &&
        !isInContentSection.test(node.path)
    );
};
