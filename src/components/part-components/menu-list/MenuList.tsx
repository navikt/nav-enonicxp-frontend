import React from 'react';
import { MainArticleProps } from 'types/content-types/main-article-props';
import { RegionProps } from '../../page-components/_dynamic/DynamicRegions';
import Lenke from 'nav-frontend-lenker';
import { xpPathToAppPath } from 'utils/paths';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { BEM } from 'utils/bem';
import './MenuList.less';

export type MenuListProps = RegionProps & MainArticleProps;

export const MenuList = (props: MenuListProps) => {
    const menuListItems = props.data?.menuListItems
        ? Object.entries(props.data.menuListItems)
        : [];
    const selectedList = props.data?.menuListItems?.selected || [];
    const bem = BEM('menu-list');

    if (menuListItems.length === 0) {
        return null;
    }

    // Todo: Oversett
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
            {menuListItems
                .filter(([key]) => selectedList.includes(key))
                .map(([key, menuItem]) => (
                    <Ekspanderbartpanel
                        key={key}
                        tittel={titles[key] || key}
                        className={bem('panel')}
                    >
                        {menuItem.link?.map((link) => {
                            const path = xpPathToAppPath(link._path);
                            return (
                                <Lenke key={path} href={path}>
                                    {link.displayName}
                                </Lenke>
                            );
                        })}
                    </Ekspanderbartpanel>
                ))}
        </div>
    );
};
