import React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { SectionPageSchema } from '../../../types/schemas/section-page-schema';
import TableContents from '../../sub-components/table-contents/TableContents';
import { BEM } from '../../../utils/bem';
import { LenkepanelListe } from '../../sub-components/lenkepanel-liste/LenkepanelListe';
import { ContentListLenkeliste } from '../../sub-components/content-list/ContentListLenkeliste';
import { LenkeNavNo } from '../../sub-components/lenke-navno/LenkeNavNo';
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
            {tableContents && <TableContents tableContents={tableContents} />}
            {(panelsHeading || panelItems) && (
                <LenkepanelListe
                    title={panelsHeading}
                    items={panelItems}
                    className={bem('panels')}
                />
            )}
            {(ntkContents || newsContents || scContents) && (
                <div className={bem('content-lists')}>
                    {ntkContents && (
                        <ContentListLenkeliste
                            content={ntkContents}
                            className={bem('content-list')}
                            maxItems={nrNTK}
                        />
                    )}
                    {newsContents?.data?.sectionContents?.length > 0 && (
                        <div
                            className={`${bem('content-list')} ${bem(
                                'nyheter'
                            )}`}
                        >
                            <ContentListLenkeliste
                                content={newsContents}
                                maxItems={nrNews}
                                showDateLabel={true}
                                sorted={true}
                            />
                            {moreNewsUrl && (
                                <LenkeNavNo
                                    href={moreNewsUrl}
                                    className={bem('flere-nyheter')}
                                    withChevron={false}
                                >
                                    <Normaltekst>{'Flere nyheter'}</Normaltekst>
                                </LenkeNavNo>
                            )}
                        </div>
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
