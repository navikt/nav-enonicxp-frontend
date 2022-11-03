const vars = {
    revalidatePeriod: 3600 * 24,
    pxPerRem: 16,
    mobileBreakpointPx: 768,
    dekoratorenHeight: 104,
};

const urls = {
    prodOrigin: 'https://www.nav.no',
    errorFeedback: `https://www${
        process.env.ENV !== 'prod' ? '.dev' : ''
    }.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler`,
};

const Config = {
    vars,
    urls,
};

export default Config;
