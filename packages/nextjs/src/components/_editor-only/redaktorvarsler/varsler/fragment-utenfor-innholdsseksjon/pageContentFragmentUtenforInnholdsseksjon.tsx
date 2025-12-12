export const pageContentFragmentUtenforInnholdsseksjon = (node: {
    path?: string;
    type?: string;
    fragment?: { descriptor: string };
}): boolean => {
    if (!node?.path) return false;

    const startsWithPageContent = /^\/pageContent\//;
    const isInContentSection = /^\/pageContent\/\d+\/content\/\d+$/;
    const isInIntroSection = /^\/pageContent\/\d+\/intro\/\d+$/;

    // Hvis et fragment er en innholdsseksjon skal den ikke gi varsel dersom den er utenfor innholdsseksjon
    if (
        startsWithPageContent &&
        node.type === 'fragment' &&
        node.fragment?.descriptor === 'no.nav.navno:section-with-header'
    ) {
        return false;
    }

    return (
        node.type === 'fragment' &&
        startsWithPageContent.test(node.path) &&
        !isInContentSection.test(node.path) &&
        !isInIntroSection.test(node.path)
    );
};
