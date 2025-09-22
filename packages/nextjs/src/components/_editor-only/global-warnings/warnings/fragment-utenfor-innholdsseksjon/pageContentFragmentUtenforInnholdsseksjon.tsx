export const pageContentFragmentUtenforInnholdsseksjon = (node: {
    path?: string;
    type?: string;
}): boolean => {
    if (!node?.path) return false;

    const isInPageContent = /^\/pageContent\//;
    const isInContentSection = /^\/pageContent\/\d+\/content\/\d+$/;
    const isInIntroSection = /^\/pageContent\/\d+\/intro\/\d+$/;

    return (
        node.type === 'fragment' &&
        isInPageContent.test(node.path) &&
        !isInContentSection.test(node.path) &&
        !isInIntroSection.test(node.path)
    );
};
