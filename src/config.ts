const vars = {
    revalidatePeriod: 3600 * 24,
    pxPerRem: 16,
    mobileBreakpointPx: 768,
    dekoratorenHeight: 104,
};

const urls = {
    errorFeedback: '/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler',
};

const Config = {
    vars,
    urls,
    isFailover:
        typeof process.env !== 'undefined' &&
        process.env.IS_FAILOVER_INSTANCE === 'true',
};

export default Config;
