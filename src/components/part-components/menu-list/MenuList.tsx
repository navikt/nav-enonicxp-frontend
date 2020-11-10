import React from 'react';
import { MainArticleProps } from 'types/content-types/main-article-props';
import { RegionProps } from '../../page-components/_dynamic/DynamicRegions';
import Lenke from 'nav-frontend-lenker';
import { ContentType } from 'types/content-types/_schema';
import { enonicPathToAppPath } from 'utils/paths';
import { MainArticleChapterProps } from 'types/content-types/main-article-chapter-props';
import { BEM } from 'utils/bem';
import './MenuList.less';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

export type MainArticleLinkedListProps =
    | (RegionProps & MainArticleProps)
    | (RegionProps & MainArticleChapterProps);

export const MenuList = (props: MainArticleLinkedListProps) => {
    const bem = BEM('menu-list');

    const menuListItems = props.data?.menuListItems || [];
    console.log(props);

    if (menuListItems.length === 0) {
        return null;
    }

    // Oversett
    const titles = {
        selfservice: 'Selvbetjening',
        formAndApplication: 'Skjema og søknad',
        processTimes: 'Saksbehandlingstider',
        relatedInformation: 'Relatert innhold',
        international: 'Internasjonalt',
        reportChanges: 'Meld fra om endringer',
        rates: 'Satser',
        appealRights: 'Klagerettigheter',
        membership: 'Medlemsskap i folketrygden',
        rulesAndRegulations: 'Regelverk',
    };

    return (
        <div className={bem()}>
            {Object.entries(menuListItems)
                .filter(([key, menuItem]) => key !== '_selected')
                .map(([key, menuItem]) => (
                    <Ekspanderbartpanel
                        tittel={titles[key] || key}
                        className={bem('panel')}
                    >
                        {menuItem.link?.map((link) => {
                            const path = enonicPathToAppPath(link._path);
                            return (
                                <Lenke href={path}>{link.displayName}</Lenke>
                            );
                        })}
                    </Ekspanderbartpanel>
                ))}
        </div>
    );
};
