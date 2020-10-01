import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { SectionPageProps } from '../../../types/content-types/section-page-props';
import TableContents from '../../part-components/table-contents/TableContents';
import { BEM } from '../../../utils/bem';
import { LenkepanelListe } from '../../part-components/lenkepanel-liste/LenkepanelListe';
import { ContentList } from '../../part-components/content-list/ContentList';
import { LenkeNavNo } from '../../part-components/lenke-navno/LenkeNavNo';
import DynamicRegion from '../../DynamicRegion';
import './SectionPage.less';

export const SectionPage = (props: SectionPageProps) => {
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
    const dynamicRegions = props.page?.regions;
    const dynamicMainRegion = dynamicRegions?.main;
    return (
        <div className={bem()}>
            {dynamicMainRegion &&
                <DynamicRegion region={dynamicMainRegion}/>
            }
            <div className={bem('tittel')}>
                <Innholdstittel>{props.displayName}</Innholdstittel>
            </div>
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
                        <ContentList
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
                            <ContentList
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
                        <ContentList
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
