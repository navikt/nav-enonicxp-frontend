import React from 'react';
import { BEM } from 'utils/bem';
import { GlobalPageSchema, PageData } from 'types/content-types/_schema';
import { ContentType, ContentTypeSchema } from 'types/content-types/_schema';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkepanelNavNo from '../_common/lenkepanel/LenkepanelNavNo';
import { MainPanelMock } from './MainPanelsMock';
import './MainPanels.less';
import './LenkepanelVertical.less';

type TableData = {
    url: string;
    tittel: string;
    children?: string;
};

const getLinkData = (
    contentData: ContentTypeSchema | null
): TableData | null => {
    if (!contentData) {
        return null;
    }

    switch (contentData.__typename) {
        case ContentType.InternalLink:
            return {
                url: contentData.data.target._path,
                tittel: contentData.displayName,
            };
        case ContentType.ExternalLink:
            return {
                url: contentData.data.url,
                tittel: contentData.displayName,
                children: contentData.data.description,
            };
        case ContentType.TransportPage:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                children: contentData.data.ingress,
            };
        case ContentType.PageList:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                children: contentData.data.ingress,
            };
        case ContentType.MainArticle:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                children: contentData.data.ingress,
            };
        default:
            return {
                url: contentData._path,
                tittel: contentData.displayName,
                children: contentData.displayName,
            };
    }
};

const ikonForTittelDemoHack = (tittel: string) => {
    if (
        tittel === 'Hva er din situasjon' ||
        tittel === 'Logg inn på Ditt NAV'
    ) {
        return (
            <img src={`${process.env.APP_ORIGIN}/gfx/id-card-1.svg`} alt={''} />
        );
    }
    if (tittel === 'arbeidsplassen.no' || tittel === 'Ledige jobber') {
        return (
            <img
                src={`${process.env.APP_ORIGIN}/gfx/NAV_arbplassen_logo.svg`}
                alt={''}
            />
        );
    }
    if (tittel === 'Skjema og søknad') {
        return (
            <img
                src={`${process.env.APP_ORIGIN}/gfx/pencil-fill.svg`}
                alt={''}
            />
        );
    }
    return undefined;
};

export const MainPanels = (props: GlobalPageSchema) => {
    const type = props.__typename;
    const data =
        type === ContentType.TemplatePage
            ? (MainPanelMock as PageData)
            : props.data;

    const { tableContents } = data;
    const bem = BEM('main-panels');

    return (
        tableContents?.length > 0 && (
            <div className={bem()}>
                {tableContents.map((content) => {
                    const link = getLinkData(content);

                    return (
                        link && (
                            <LenkepanelNavNo
                                href={link.url}
                                separator={true}
                                tittel={link.tittel}
                                ikon={ikonForTittelDemoHack(link.tittel)}
                                key={content._id}
                                className={`lenkepanel-vertical ${bem('item')}`}
                            >
                                <Normaltekst>{link.children}</Normaltekst>
                            </LenkepanelNavNo>
                        )
                    );
                })}
            </div>
        )
    );
};

export default MainPanels;
