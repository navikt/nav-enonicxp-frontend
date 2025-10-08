export const ErGodkjentSide = (contentType: string): boolean => {
    //Redaktørvarslene gjelder kun på følgende sider
    const godkjenteSider = [
        'no.nav.navno:situation-page',
        'no.nav.navno:guide-page',
        'no.nav.navno:themed-article-page',
        'no.nav.navno:content-page-with-sidemenus',
        'no.nav.navno:tools-page',
        'no.nav.navno:generic-page',
        'no.nav.navno:product-details',
    ];
    return godkjenteSider.includes(contentType);
};
