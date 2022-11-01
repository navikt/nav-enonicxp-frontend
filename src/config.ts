const vars = {
    revalidatePeriod: 3600 * 24,
    pxPerRem: 16,
    mobileBreakpointPx: 768,
    dekoratorenHeight: 104,
};

const urls = {
    prodOrigin: 'https://www.nav.no',
    errorFeedback: `${process.env.APP_ORIGIN}/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler`,
};

const Config = {
    vars,
    urls,
};

export default Config;
