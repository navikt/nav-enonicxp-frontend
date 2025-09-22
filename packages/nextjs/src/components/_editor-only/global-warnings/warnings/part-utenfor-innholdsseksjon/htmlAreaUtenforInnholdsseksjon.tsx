export const htmlAreaUtenforInnholdsseksjon = (node: {
    path?: string;
    descriptor?: string;
}): boolean => {
    if (!node?.path) return false;

    const isInPageContent = /^\/pageContent\//;
    const isInContentSection = /^\/pageContent\/\d+\/content\/\d+$/;
    const isInIntroSection = /^\/pageContent\/\d+\/intro\/\d+$/;

    return (
        node.descriptor === 'no.nav.navno:html-area' &&
        isInPageContent.test(node.path) &&
        !isInContentSection.test(node.path) &&
        !isInIntroSection.test(node.path)
    );
};
