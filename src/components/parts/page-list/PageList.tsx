import React from 'react';
import { BEM } from 'utils/bem';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { xpPathToAppPath } from '../../../utils/paths';
import { ContentProps } from '../../../types/content-props/_content-common';
import './PageList.less';

const PageList = (props: ContentProps) => {
    const bem = BEM('page-list');
    const sectionContents = (props.data?.sectionContents || []).filter(
        (section) => props._id !== section._id
    );

    return (
        <div className={bem()}>
            <Innholdstittel>{props.displayName}</Innholdstittel>
            <div className={bem('ingress')}>
                <Normaltekst>{props.data.ingress}</Normaltekst>
            </div>
            <div className={bem('list')}>
                {sectionContents.map((section) => {
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
                                <div className={bem('ingress')}>
                                    <Normaltekst>
                                        {section.data?.ingress}
                                    </Normaltekst>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PageList;
