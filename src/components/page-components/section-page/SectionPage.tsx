import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { SectionPageSchema } from '../../../types/schemas/section-page-schema';
import TableContents from '../../sub-components/table-contents/TableContents';
import { BEM } from '../../../utils/bem';
import { LenkepanelListe } from '../../sub-components/lenkepanel-liste/LenkepanelListe';
import { ContentListLenkeliste } from '../../sub-components/content-list/ContentListLenkeliste';
import { Nyheter } from '../../sub-components/nyheter/Nyheter';
import './SectionPage.less';

export const SectionPage = (props: SectionPageSchema) => {
    const {
        // nrTableEntries,
        tableContents,
        panelsHeading,
        panelItems,
        nrNews,
        newsContents,
        moreNewsUrl,
        nrNTK,
        ntkContents,
        nrSC,
        scContents,
    } = props.data;
    const bem = BEM('section-page');

    return (
        <div className={bem()}>
            <Sidetittel className={bem('tittel')}>
                {props.displayName}
            </Sidetittel>
            {tableContents && (
                <TableContents tableContents={tableContents} cssBlock={bem()} />
            )}
            {(panelsHeading || panelItems) && (
                <LenkepanelListe
                    title={panelsHeading}
                    items={panelItems}
                    className={bem('panels')}
                />
            )}
            {(ntkContents || newsContents || scContents) && (
                <div className={'section-page__content-lists'}>
                    {ntkContents && (
                        <ContentListLenkeliste
                            content={ntkContents}
                            className={bem('content-list')}
                            maxItems={nrNTK}
                        />
                    )}
                    {newsContents?.data?.sectionContents?.length > 0 && (
                        <Nyheter
                            newsContents={newsContents}
                            nrNews={nrNews}
                            moreNewsUrl={moreNewsUrl}
                        />
                    )}
                    {scContents && (
                        <ContentListLenkeliste
                            content={scContents}
                            className={bem('content-list')}
                            maxItems={nrSC}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
