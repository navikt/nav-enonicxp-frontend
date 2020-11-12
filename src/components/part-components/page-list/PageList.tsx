import React from 'react';
import { BEM } from 'utils/bem';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { RegionProps } from '../../page-components/_dynamic/DynamicRegions';
import { GlobalPageSchema } from 'types/content-types/_schema';
import './PageList.less';
import Lenke from 'nav-frontend-lenker';
import { xpPathToAppPath } from '../../../utils/paths';

const PageList = (props: RegionProps & GlobalPageSchema) => {
    console.log(props);
    const bem = BEM('page-list');
    return (
        <div className={bem()}>
            <Innholdstittel>{props.displayName}</Innholdstittel>
            <div className={bem('list')}>
                {props.data?.sectionContents.map((section) => {
                    const { displayName, _path } = section;
                    const ingress = section.data?.ingress;
                    return (
                        <div key={section._path} className={bem('row')}>
                            <Normaltekst>
                                <Lenke href={xpPathToAppPath(_path)}>
                                    {displayName}
                                </Lenke>
                            </Normaltekst>
                            {ingress && (
                                <Normaltekst>
                                    {section.data?.ingress}
                                </Normaltekst>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PageList;
