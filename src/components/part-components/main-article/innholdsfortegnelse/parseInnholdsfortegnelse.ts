export const parseInnholdsfortegnelse = (htmlText: string, hasTableOfContents: string) => {

    if (!hasTableOfContents || hasTableOfContents === 'none') {
        return {
            innholdsfortegnelse: [],
            modifiedHtml: htmlText
        };
    }

    const innholdsfortegnelse = [];
    let modifiedHtml = htmlText;
    let count = 0;
    let chapter = 1;
    let hTagStart = modifiedHtml.indexOf('<h3>');
    while (hTagStart !== -1 && count < 100) {
        const hTagEnd = hTagStart + 4;
        const hEndTagStart = modifiedHtml.indexOf('</h3>', hTagStart);
        const headerText = modifiedHtml
            .slice(hTagEnd, hEndTagStart)
            .replace(/<([^>]+)>/gi, '') // Strip html
            .replace(/&nbsp;/gi, ' '); // Replace &nbsp;

        count++;
        innholdsfortegnelse.push(headerText);
        modifiedHtml = modifiedHtml.replace(
            '<h3>',
            '<h3 id="chapter-' + chapter++ + '" tabindex="-1" class="chapter-header">'
        );
        hTagStart = modifiedHtml.indexOf('<h3>');
    }

    return {
        innholdsfortegnelse: innholdsfortegnelse,
        modifiedHtml: modifiedHtml
    };
}
