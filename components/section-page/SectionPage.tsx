import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { SectionPageSchema } from '../../types/schemas/section-page-schema';

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

    return (
        <div className={'section-page'}>
            <Sidetittel className={'section-page__tittel'}>
                {props.displayName}
            </Sidetittel>
            {/*{tableContents && (*/}
            {/*    <TableContents*/}
            {/*        tableContentIds={tableContents}*/}
            {/*        className={'section-page'}*/}
            {/*    />*/}
            {/*)}*/}
            {/*{(panelsHeading || panelItems) && (*/}
            {/*    <TransportPage*/}
            {/*        type={ContentType.TransportPage}*/}
            {/*        data={{ title: panelsHeading, items: panelItems }}*/}
            {/*        _id={''}*/}
            {/*        _path={''}*/}
            {/*        createdTime={''}*/}
            {/*        modifiedTime={''}*/}
            {/*        displayName={''}*/}
            {/*    />*/}
            {/*)}*/}
            {/*{(ntkContents || newsContents || scContents) && (*/}
            {/*    <div className={'section-page__content-lists'}>*/}
            {/*        {ntkContents && (*/}
            {/*            <ContentListLenkeliste*/}
            {/*                contentListId={ntkContents}*/}
            {/*                className={'section-page__content-list'}*/}
            {/*                maxItems={nrNTK}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*        {newsContents && (*/}
            {/*            <Nyheter*/}
            {/*                newsContents={newsContents}*/}
            {/*                nrNews={nrNews}*/}
            {/*                moreNewsUrl={moreNewsUrl}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*        {scContents && (*/}
            {/*            <ContentListLenkeliste*/}
            {/*                contentListId={scContents}*/}
            {/*                className={'section-page__content-list'}*/}
            {/*                maxItems={nrSC}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};
