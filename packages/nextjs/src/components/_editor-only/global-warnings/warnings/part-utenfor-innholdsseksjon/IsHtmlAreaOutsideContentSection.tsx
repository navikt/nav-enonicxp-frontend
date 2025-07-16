export const isHtmlAreaOutsideContentSection = (node: {
    path?: string;
    descriptor?: string;
}): boolean => {
    if (!node?.path) return false;

    const pageContentRegex = /\/pageContent\/\d+\/content\/\d+$/;
    // const dashRegex = /^\/$/;
    // const mainRegex = /^\/main/;

    return (
        node.descriptor === 'no.nav.navno:html-area' && !pageContentRegex.test(node.path)
        // &&
        // !dashRegex.test(node.path) &&
        // !mainRegex.test(node.path)
    );
};
