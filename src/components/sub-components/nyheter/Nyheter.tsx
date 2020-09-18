import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { ContentListLenkeliste } from '../content-list/ContentListLenkeliste';
import { ContentListSchema } from '../../../types/schemas/content-list-schema';
import { LenkeNavNo } from '../lenke-navno/LenkeNavNo';
import './Nyheter.less';

type Props = {
    newsContents: ContentListSchema;
    nrNews?: number;
    moreNewsUrl?: string;
};

export const Nyheter = ({ newsContents, nrNews, moreNewsUrl }: Props) => {
    return (
        <div className={'section-page__content-list section-page__nyheter'}>
            <ContentListLenkeliste
                content={newsContents}
                maxItems={nrNews}
                showDateLabel={true}
                sorted={true}
            />
            {moreNewsUrl && (
                <LenkeNavNo
                    href={moreNewsUrl}
                    className={'section-page__flere-nyheter'}
                    withChevron={false}
                >
                    <Normaltekst>{'Flere nyheter'}</Normaltekst>
                </LenkeNavNo>
            )}
        </div>
    );
};
