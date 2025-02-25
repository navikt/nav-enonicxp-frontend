export const parseInnholdsfortegnelse = (htmlText?: string, hasTableOfContents?: boolean) => {
    if (!hasTableOfContents || !htmlText) {
        return [];
    }

    const htmlSegments = htmlText.split('<h3>');

    const innholdsfortegnelse = htmlSegments.slice(1).map(
        (segment) =>
            segment
                .split('</h3>')[0]
                .replace(/<([^>]+)>/gi, '') // Strip html
                .replace(/&nbsp;/gi, ' ') // Replace &nbsp;
    );

    return innholdsfortegnelse;
};
