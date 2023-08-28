const vars = {
    revalidatePeriod: 3600 * 24,
    pxPerRem: 16,
    mobileBreakpointPx: 768,
    dekoratorenHeight: 104,
    hovedNummer: '55553333',
    defaultLocale: 'no',
} as const;

const urls = {
    prodOrigin: 'https://www.nav.no',
    errorFeedback: `https://www${
        process.env.ENV !== 'prod' ? '.dev' : ''
    }.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler`,
    skrivTilOss: '/skriv-til-oss',
    sokNavKontor: 'https://www.nav.no/sok-nav-kontor',
    sokNavKontorEn: 'https://www.nav.no/sok-nav-kontor/en',
    kontaktHjelpemiddelSentral:
        '/no/person/hjelpemidler/hjelpemidler-og-tilrettelegging/kontakt-nav-hjelpemiddelsentral',
    hovedNummerTlf: `tel:+47${vars.hovedNummer}`,
} as const;

const Config = {
    vars,
    urls,
} as const;

export default Config;
