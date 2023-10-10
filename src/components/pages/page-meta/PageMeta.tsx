import { BodyShort, Heading } from '@navikt/ds-react';
import React from 'react';
import { translationsBundleNb } from 'translations/default';
import { PageMetaProps } from 'types/content-props/page-meta-props';

import styles from './PageMeta.module.scss';

export const PageMeta = (props: PageMetaProps) => {
    const data = props.data.contentType[props.data.contentType._selected];

    const filterUndisplayableFields = (key: string) => {
        return ![
            'illustration',
            'formDetailsTargets',
            'processing_times',
            'rates',
            'payout_dates',
        ].includes(key);
    };

    const getTerm = (key: string) => {
        return (
            {
                hideFromProductlist: 'Skjul i oversiktssider',
                audience: 'Målgruppe',
                area: 'Områdekategori',
                taxonomy: 'Kategori',
                customPath: 'Kort-url',
                owner: 'Eier',
                feedbackToggle: 'Vis "Fant du det du lette etter?"',
                chatbotToggle: 'Vis chatbot',
                noindex: 'Skal ikke vises i søk',
            }[key] || key
        );
    };

    const getDefinition = (key: string, value: any) => {
        if (typeof value === 'boolean') {
            return value ? 'Ja' : 'Nei';
        }
        if (key === 'audience') {
            return {
                person: 'For privatpersoner',
                employer: 'For arbeidsgivere',
                provider: 'For samarbeidspartnere',
            }[value._selected];
        }
        if (key === 'taxonomy') {
            return translationsBundleNb.taxonomies[value];
        }
        if (key === 'area') {
            const area = value || [];
            return area
                .map((areaKey: string) => translationsBundleNb.areas[areaKey])
                .join(', ');
        }
        if (key === 'owner') {
            return value.join(', ');
        }
        return JSON.stringify(value);
    };

    return (
        <article className={styles.pageMetaData}>
            <BodyShort>Metadata for</BodyShort>
            <Heading level={'1'} size={'large'}>
                {props.displayName}
            </Heading>
            <dl className={styles.definition}>
                {Object.keys(data)
                    .filter(filterUndisplayableFields)
                    .map((key) => (
                        <div key={key} className={styles.row}>
                            <dt>{getTerm(key)}</dt>
                            <dd>{getDefinition(key, data[key])}</dd>
                        </div>
                    ))}
            </dl>
        </article>
    );
};
